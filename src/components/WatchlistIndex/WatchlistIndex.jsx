
import { useEffect, useContext, useState } from "react"
import LoadingIcon from "../LoadingIcon/LoadingIcon"
import { UserContext } from "../../contexts/UserContext"
import MovieCard from "../MovieCard/MovieCard"
import { WatchlistIndex, WatchlistDelete  } from "../../services/watchlist"
import { MdOutlineLocalMovies } from "react-icons/md"
import { Navigate } from "react-router"
import MovieModal from "../MovieModal/MovieModal"

const Watchlist = () => {
    const { user } = useContext(UserContext)
    const [watchlistItems, setWatchlistItems] = useState([])
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedMovie, setSelectedMovie] = useState(null)

    useEffect(() => {
        const getWatchlist = async () => {
            try {
                setIsLoading(true)
                // Get watchlist from your database
                const response = await WatchlistIndex()
                setWatchlistItems(response.data)
                console.log('Watchlist from DB:', response.data)
                
                // Fetch full movie details from TMDB for each movie ID
                if (response.data.length > 0) {
                    const fullMovies = response.data.map(item => item.movie)
                    console.log('Movies from watchlist:', fullMovies)
                    setMovies(fullMovies)
                } else {
                    setMovies([])
                }
            } catch (err) {
                console.error('Failed to load watchlist', err)
            } finally {
                setIsLoading(false)
            }
        }
        getWatchlist()
    },[])
    

const removeFromWatchlist = async (movie) => {
    try {
        const watchlistItem = watchlistItems.find(item => item.movie.id === movie.id)
        if (!watchlistItem) return

        await WatchlistDelete(movie.tmdb_id)  // backend expects TMDB ID
        setWatchlistItems(prev => prev.filter(item => item.id !== watchlistItem.id))
        setMovies(prev => prev.filter(m => m.id !== movie.id))
        setSelectedMovie(null)
    } catch (err) {
        console.error('Failed to remove from watchlist', err)
    }
}

    if (!user) return <Navigate to='/auth/sign-in/'/>

    return (
        <>
        <div className="pb-24 min-h-screen bg-gray-900 px-4 pt-20">
        <div className="flex flex-col py-7 gap-4">
        <h1 className="text-center text-xl font-bold text-gray-400">My Movies</h1>
        {isLoading ? (
            <div className='flex justify-center items-center py-20'>
                <LoadingIcon />
            </div>
        ) : (
        <> 
        {movies.length === 0 ? (
            <div className="flex flex-col py-7 gap-4 text-center text-xl font-bold text-gray-400 items-center">
            <MdOutlineLocalMovies size={60}/>
            <h2> No saved movies yet!</h2>
            <p>Head to Discover to start building your collection!</p>
            </div>
        ) : (
            <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-3 bg-gray-900'>
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
            ))}
            </div>
        )}
        </>
        )}
        </div>
        </div>
        {selectedMovie && (
        <MovieModal 
            movie={selectedMovie} 
            onClose={() => setSelectedMovie(null)}
            isOnWatchlist={true}
            addToWatchlist={removeFromWatchlist}
        />)}
        </>
    )
}

export default Watchlist