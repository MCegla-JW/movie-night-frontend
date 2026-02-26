import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import {
  getVotes,
  castVote,
  removeVote,
  breakTie
} from "../../services/votes";
import MovieCard from "../MovieCard/MovieCard";

const MoviePartyVoting = ({ partyId }) => {
  const { user } = useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const [winner, setWinner] = useState(null);
  const [isCreator, setIsCreator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userVotes, setUserVotes] = useState(new Set());


  useEffect(() => {
    fetchVotes();
  }, [partyId]);

  const fetchVotes = async () => {
    setIsLoading(true);
    setError(null);

    try {
    const response = await getVotes(partyId);

      setMovies(response.data.movies || []);
      setWinner(response.data.winner);
      setIsCreator(response.data.is_creator);

      // Track which movies user has voted for
      const votedMovies = new Set();
      response.data.movies?.forEach((movie) => {
        if (movie.user_has_voted) {
          votedMovies.add(movie.movie.id);
        }
      });
      setUserVotes(votedMovies);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch votes", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async (movieId) => {
    try {
     await castVote(partyId, movieId);

      setUserVotes((prev) => new Set([...prev, movieId]));
      fetchVotes(); // Refresh to get updated vote counts
    } catch (err) {
      console.error("Failed to vote", err);
      alert(err.response?.data?.message || "Failed to vote");
    }
  };

  const handleUnvote = async (movieId) => {
    try {
     await removeVote(partyId, movieId);
      setUserVotes((prev) => {
        const newSet = new Set(prev);
        newSet.delete(movieId);
        return newSet;
      });
      fetchVotes();
    } catch (err) {
      console.error("Failed to remove vote", err);
      alert("Failed to remove vote");
    }
  };

  const handleBreakTie = async () => {
    if (!window.confirm("Break the tie? This will randomly select a winner.")) {
      return;
    }

    try {
    const response = await breakTie(partyId);

      alert(`Winner selected: ${response.data.winning_movie.title}`);
      fetchVotes();
    } catch (err) {
      console.error("Failed to break tie", err);
      alert(err.response?.data?.error || "Failed to break tie");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen bg-gray-900">
        <LoadingIcon />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen bg-gray-900">
        <div className="border border-red-500 bg-red-500/10 rounded-md p-6 text-red-400">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 min-h-screen bg-gray-900 px-4 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="py-7">
          <h1 className="text-center text-2xl font-bold text-white mb-2">
            Movie Night Vote
          </h1>
          <p className="text-center text-sm text-gray-400 uppercase tracking-wider">
            Cast Your Ballot
          </p>
        </div>

        {/* Winner Announcement */}
        {winner && (
          <div className="mb-8 border border-indigo-500 bg-indigo-500/10 rounded-md p-6">
            <div className="text-center">
              <div className="inline-block bg-gray-900 border border-indigo-500 px-4 py-1 rounded-md mb-4">
                <span className="text-xs text-indigo-400 uppercase tracking-wider font-semibold">
                  {winner.status === "clear winner" ? "★ Winner ★" : "⚠ Tie ⚠"}
                </span>
              </div>

              {winner.status === "clear winner" ? (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {winner.movie_title}
                  </h2>
                  <p className="text-gray-400">
                    {winner.votes} {winner.votes === 1 ? "vote" : "votes"}
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Tied with {winner.votes}{" "}
                    {winner.votes === 1 ? "vote" : "votes"} each
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center mb-6">
                    {winner.tied_movies.map((movie) => (
                      <div
                        key={movie.movie_id}
                        className="border border-indigo-500 bg-indigo-500/20 rounded-md px-4 py-2"
                      >
                        <span className="text-white text-sm">
                          {movie.movie_title}
                        </span>
                      </div>
                    ))}
                  </div>
                  {isCreator && (
                    <button
                      onClick={handleBreakTie}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-200"
                    >
                      🎲 Break the Tie
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-3">
          {movies.map((movieData) => {
            const movie = movieData.movie;
            const votes = movieData.num_votes || 0;
            const hasVoted = userVotes.has(movie.id);
            const isWinning =
              winner?.status === "clear winner" &&
              winner?.movie_id === movie.id;

            return (
              <div
                key={movie.id}
                className={`bg-white/5 rounded-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 ${
                  isWinning ? "ring-2 ring-indigo-500 shadow-lg shadow-indigo-500/50" : ""
                }`}
              >
                {/* Movie Poster */}
                <div className="relative aspect-2/3 bg-gray-800">
                <MovieCard key={movie.id} movie={movie}/>
                </div>

                {/* Movie Info */}
                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                    {movie.title}
                  </h3>

                  {movie.release_date && (
                    <p className="text-gray-400 text-xs mb-3">
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                  )}

                  {/* Vote Count */}
                  <div className="flex items-center gap-2 mb-3 bg-white/5 border border-slate-600 rounded-md p-2">
                    <span className="text-2xl font-bold text-indigo-400">
                      {votes}
                    </span>
                    <span className="text-xs text-gray-400 uppercase">
                      {votes === 1 ? "Vote" : "Votes"}
                    </span>
                  </div>

                  {/* Vote Button */}
                  {hasVoted ? (
                    <button
                      onClick={() => handleUnvote(movie.id)}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2 px-3 rounded-md transition-colors duration-200"
                    >
                      ✓ Voted
                    </button>
                  ) : (
                    <button
                      onClick={() => handleVote(movie.id)}
                      className="w-full border border-slate-600 bg-white/5 hover:bg-indigo-600 hover:border-indigo-500 text-white text-sm font-semibold py-2 px-3 rounded-md transition-colors duration-200"
                    >
                      Vote
                    </button>
                  )}

                  {/* Added By */}
                  {movieData.added_by_user && (
                    <p className="text-xs text-gray-500 text-center mt-2 italic">
                      Added by {movieData.added_by_user.username || "User"}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {movies.length === 0 && (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="text-6xl mb-4 opacity-30">🎬</div>
            <p className="text-gray-400 text-lg uppercase tracking-wider">
              No Movies in Party Yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePartyVoting;