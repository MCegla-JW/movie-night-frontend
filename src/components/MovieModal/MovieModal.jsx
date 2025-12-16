const MovieModal = ({movie, onClose, isOnWatchlist}) => {

    if (!movie) return null
    return (
        <>
        <div className="modal modal-open">
            <div className='modal-box w-full max-w-2xl sm:max-w-3xl bg-base-100 shadow-xl'>
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} className='rounded-lg mb-4 w-full object-contain max-h-96'/>
                <h3 className='font-bold text-xl sm:text-2xl mb-4'>{movie.title}</h3>
                <p className='mb-2'><span className='font-semibold'>Release Date: </span>{movie.release_date || 'N/A'}</p>
                <p className='mb-4'><span className='font-semibold'>Synopsis: </span>{movie.overview}</p>
                <p className='mb-4'><span className='font-semibold'>Rating: </span>{movie.vote_average}</p>
                <div className='flex justify-end gap-3'>
                    <button className='btn btn-primary'>
                        {isOnWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</button>
                        <button className='btn' onClick={onClose}>Close</button>
                </div>
            </div>
            <div className='modal-backdrop' onClick={onClose}>
            </div>
        </div>
        </>
    )
}

export default MovieModal