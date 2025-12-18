import { UserContext } from "../../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import MovieCard from "../MovieCard/MovieCard";
import MovieModal from "../MovieModal/MovieModal";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import axios from "axios";
import { WatchlistCreate, WatchlistIndex } from "../../services/watchlist";

const Discover = () => {
  const { user } = useContext(UserContext);
  const [searchVal, setSearchVal] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  // const [isOnWatchlist, setIsOnWatchlist] = useState([])
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const url = searchVal
          ? `http://localhost:8000/movies/?search=${searchVal}`
          : "http://localhost:8000/movies/";
        const response = await axios.get(url);
        setMovies(response.data.movies);
        console.log(response);
      } catch (err) {
        console.error("Failed to load movies", err);
      } finally {
        setIsLoading(false);
      }
    };
    const timeout = setTimeout(() => {
      getMovies();
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchVal]);

  // Add movie to watchlist
    const addToWatchlist = async (movie) => {
        try {
        await WatchlistCreate(movie);
        setWatchlist(prev =>[...prev, movie])
        } catch (err) {
        console.error("Failed to load movies", err);
        }
    }
    //const isOnWatchlist = (movieId) => watchlist.some((w) => w.id === movieId)

    return (
      <>
        <div className="pb-24 min-h-screen bg-gray-900 px-4">
          <div className="flex flex-col py-7 gap-4">
            <h1 className="text-center text-xl font-bold text-gray-400">
              Popular This Week
            </h1>
            <div className="relative w-full">
              <HiOutlineSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search movies"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full border border-slate-600 rounded-md bg-white/5 pr-3 pl-12 py-2 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              ></input>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingIcon />
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-3  bg-gray-900">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={setSelectedMovie}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)} addToWatchlist={addToWatchlist}
          />
        )}
      </>
    );
  };

export default Discover;
