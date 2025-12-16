const MovieCard = ({movie, onClick}) => {
    return (
        <>
        {/* MovieCard */}
        <div onClick={() => onClick(movie)} className="cursor-pointer transition-transform hover:scale-105">
                <img
                key={movie.id}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg w-full h-auto"
                onError={(e) => {
                    e.target.onerror = null 
                    e.target.style.display = 'none'
                }}
                />
                {!movie.poster_path && (
                    <div className='rounded-lg w-full h-auto bg-gray-800 border border-gray-600 flex items-center justify-center text-gray-500'>
                        {movie.title}
                    </div>
                )}
        </div>
        </>

    )
}

export default MovieCard 