const MovieModal = ({ movie, onClose, isOnWatchlist, addToWatchlist }) => {
if (!movie) return null;

const m = movie.movie || movie
const backdropUrl = m.backdrop_path || m.backdrop
const overview = m.overview || m.overview || 'No overview available'
const rating = m.vote_average || m.rating 
const releaseDate = m.release_date 

  return (
    <>
      <div className="modal modal-open">
        <div className="modal-box w-full max-w-2xl sm:max-w-3xl bg-base-100 shadow-xl">
          <img
            src={`https://image.tmdb.org/t/p/w500${backdropUrl}`}
            alt={m.title}
            className="rounded-lg mb-4 w-full object-contain max-h-96"
          />
          <h3 className="font-bold text-xl sm:text-2xl mb-4">{m.title}</h3>
          <p className="mb-2">
            <span className="font-semibold"></span>
            {releaseDate || "N/A"}
          </p>
          <p className="mb-4">
            <span className="font-semibold"></span>
            {overview}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Rating: </span>
            {rating}
          </p>
          <div className="flex justify-end gap-3">
            <button  onClick={() => addToWatchlist(m)} className="btn btn-sm rounded-md bg-green-700 hover:bg-green-300">{isOnWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
        <div className="modal-backdrop" onClick={onClose}></div>
      </div>
    </>
  );
};

export default MovieModal;
