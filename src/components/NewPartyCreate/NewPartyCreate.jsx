import { useContext, useState } from 'react'
import { useNavigate, Navigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { PartyCreate } from '../../services/party'
import { Link } from 'react-router'

const NewPartyCreate = () => {
    const { user } = useContext(UserContext)
    const [ formData, setFormData ] = useState({
        title: '',
        date: '',
    })
    const [errorData, setErrorData] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const input = e.target
        setFormData({...formData, [input.name]: input.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const { data } = await PartyCreate(formData)
        navigate(`/parties/${data._id}`)
    } catch (error) {
        console.log(error)
        if (error.response?.status === 500) {
            return setErrorData({ message: 'Something went wrong. Please try again.'})
        }
        setErrorData(error.response?.data)
    }
}

if (!user) return <Navigate to='/auth/sign-in/'/>

return (
        <>
    <div className="w-full px-4 sm:px-0 bg-gray-900">
    <div className="flex min-h-screen flex-col justify-center py-8 sm:py-12">
    <h1 className="mb-2 text-center text-xl font-bold tracking-tight sm:text-2xl text-gray-400">Create Watch Party</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title" className="block text-sm/6 font-semibold text-purple-400">Party Title</label>
          <input className="block w-full border border-slate-600 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" type="text" name="title" id="title" placeholder='Party Title' required value={formData.title} onChange={handleChange} />
          { errorData?.title && <p className='error-message'>{errorData.title}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="date" className="block text-sm/6 font-semibold text-purple-400">Date</label>
          <input className="block w-full border border-slate-600 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" name="date" id="date" placeholder="Date" required value={formData.date} onChange={handleChange}></input>
          { errorData?.text && <p className='error-message'>{errorData.date}</p>}
        </div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mb-3 mt-3">Create Party</button>
        <p className="mt-10 text-center text-sm/6 text-gray-400"><Link className="font-semibold text-indigo-400 hover:text-indigo-300" to='/parties/'>Close</Link></p>
        { errorData?.message && <p className='error-message'>{errorData.message}</p>}
      </form>
      </div>
      </div>
    </>
)
}

export default NewPartyCreate