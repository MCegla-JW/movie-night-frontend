import { useNavigate, Navigate, useParams, Link } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import { useContext, useState, useEffect } from "react"
import LoadingIcon from "../LoadingIcon/LoadingIcon"
import { partyShow, partyUpdate } from "../../services/party"


const UpdateParty = () => {
    const {user} = useContext(UserContext)

    const [formData, setFormData ] = useState({
        title: '',
        date: '',
    })
    const [isLoading, setIsLoading] = useState(true)
    const [errorData, setErrorData] = useState({})
    const { partyId } = useParams()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const input = e.target
        setFormData({...formData, [input.name]: input.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await partyUpdate(partyId, formData)
            navigate(`/parties/${partyId}`)
        } catch (error) {
            console.log(error)
            if (error.response.status === 5000) {
                return setErrorData({message: 'Something went wrong. Please try again.'})
            }
            setErrorData(error.response.data)
        }
    }
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await partyShow(partyId)
                setFormData(data)
            } catch (error) {
                console.log(error)
                const { status, data } = error.response
                if (status === 500) {
                    setErrorData({message: 'Something went wrong. Please try again.'})
                } else if (status === 404) {
                navigate('/page-not-found')
                } else {
                    setErrorData(data)
                }
                } finally {
                setIsLoading(false)
                }
            }
            getData()
        }, [partyId, navigate])

    if (!user) return <Navigate to='/auth/sign-in/'/>
return (
<>
    <div className="w-full px-4 sm:px-0 bg-gray-900">
    <div className="flex min-h-screen flex-col justify-center py-8 sm:py-12">
    <h1 className="mb-2 text-center text-xl font-bold tracking-tight sm:text-2xl text-gray-400">Update Your Watch Party</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title" className="block text-sm/6 font-semibold text-purple-400">Party Title</label>
          <input className="block w-full border border-slate-600 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" type="title" name="title" id="title" placeholder='Party Title' required value={formData.title} onChange={handleChange} />
          { errorData?.title && <p className='error-message'>{errorData.title}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="date" className="block text-sm/6 font-semibold text-purple-400">Date</label>
          <input className="block w-full border border-slate-600 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" type='date' name="date" id="date" placeholder="Date" required value={formData.date} onChange={handleChange}></input>
          { errorData?.text && <p className='error-message'>{errorData.date}</p>}
        </div>
        <p>Tip: After creating, you'll get a shareable link to invite friends. Only movies you liked will appear for voting!</p>
        <button type="submit" className="flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mb-3 mt-3">Create Party</button>
        <p className="mt-10 text-center text-sm/6 text-gray-400"><Link className="font-semibold text-indigo-400 hover:text-indigo-300" to='/parties/'>Close</Link></p>
        { errorData?.message && <p className='error-message'>{errorData.message}</p>}
      </form>
      </div>
      </div>
    </>
)
}

export default UpdateParty
