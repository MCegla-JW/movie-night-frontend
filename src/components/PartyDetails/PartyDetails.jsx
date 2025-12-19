import { useEffect, useState, useContext} from 'react'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { UserContext } from '../../contexts/UserContext'
import { partyShow, partyDelete } from '../../services/party'
import { useParams, useNavigate } from 'react-router'
import { Link } from 'react-router'
import MovieCard from '../MovieCard/MovieCard'
import MovieModal from '../MovieModal/MovieModal'
import MyModal from '../PartyLinkModal/PartyLinkModal'
import DeleteModal from '../DeleteModal/DeleteModal'

const PartyDetails = () => {
    const { user } = useContext(UserContext)
    const [party, setParty] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorData, setErrorData] = useState({})
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [movies, setMovies] = useState([])
    const { partyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
    if (!partyId) return
        const getData = async () => {
            try {
                const { data } = await partyShow(partyId)
                console.log("partyId from params:", partyId)
                setParty(data)
                console.log("Party data:", data);
                console.log("User ID:", user.id, "Creator ID:", data.creator_id);

                if (data.movies) {
                  setMovies(data.movies.map(pm => pm.movie))
                }
            } catch (error) {
                console.log(error)
                if (error.response.status === 500) {
                    setErrorData({message: 'Something went wrong. Pelase try again'})
                } else if (error.response.status === 404) {
                    navigate('/page-not-found')
                } else {
                    setErrorData(error.response.data)
                }
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [partyId, navigate])

    return (
        <>
    <div className="w-full px-4 sm:px-0 bg-gray-900">
    <div className="flex min-h-screen flex-col justify-center py-8 sm:py-12">
        { errorData.message 
        ? <p className='error-message'>{errorData.message}</p>
        : isLoading
          ? <LoadingIcon />
          : party
            ? (
              <>
                <section className='post-content'>
                <h1 className="mb-2 text-center text-xl font-bold tracking-tight sm:text-2xl text-gray-400">{party.title}</h1>
                <h2 className="mb-2 text-center text-xl font-bold tracking-tight sm:text-2xl text-gray-400">{party.date}</h2>
                <h1 className="mb-2 text-center text-xl font-bold tracking-tight sm:text-2xl text-gray-400">Movie List</h1>
                <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-3 bg-gray-900'>
                {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
                ))}
                </div>
                </section>
              </>
            ) 
            : <p>Nothing to display.</p>
      }
      {party && party.creator?.id === user.id && (
        <>
    <MyModal party={party}>Invite to Party</MyModal>
    <button type="submit" className="flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mb-3 mt-3"><Link to={`/parties/${partyId}/edit`}>Edit Party</Link></button>
    <DeleteModal partyId={partyId}/>
      </>
      )}
      <p className="mt-10 text-center text-sm/6 text-gray-400"><Link className="font-semibold text-indigo-400 hover:text-indigo-300" to='/parties/'>Back</Link></p>
      </div>
      </div>
      {selectedMovie && (
              <MovieModal 
                  movie={selectedMovie} 
                  onClose={() => setSelectedMovie(null)}
                  isOnWatchlist={true}
              />)}
    </>
    )
}

export default PartyDetails