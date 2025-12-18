import { useState } from "react";
import { useNavigate } from "react-router";
import { signUpService } from '../../services/auth'
import { Link } from "react-router";

const SignUp = () => {
    const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: ""   
    })
    const [errorData, setErrorData] = useState({})
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const newFormData = {...formData, [e.target.name]: e.target.value
        }
        setFormData(newFormData)
        setErrorData({...errorData, [e.target.name]: ''})
    }

const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
        await signUpService(formData)
        navigate('/auth/sign-in/')
    } catch (error) {
        const res = error.response
        if (!res) {
            return setErrorData({message: 'Network error. Try again'})
        }
        if (res.status === 500) {
            setErrorData({ message: 'Something went wrong. Please try again.'})
        } else {
        setErrorData(res.data)
        }
    }   finally {
        setIsLoading(false)
    }
}
return (
    <>
    <div className="w-full px-4 sm:px-0 bg-gray-900">
    <div className="flex min-h-screen flex-col justify-center py-8 sm:py-12">
    <h1 className="mb-2 text-center text-xl font-bold tracking-tight sm:text-2xl text-gray-400">Create an account</h1>
    <form onSubmit={handleSubmit}>
        <div className='form-control'>
            <label htmlFor='username' className="block text-sm/6 font-semibold text-purple-400">Username</label>
            <input className="block w-full border border-slate-600 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" type='text' name='username' id='username' onChange={handleChange} required/>
            {errorData.username && <p className='error-message text-red-400 font-bold'>{errorData.username}</p>}
        </div>

        <div className='form-control'>
            <label htmlFor='email' className="block text-sm/6 font-semibold text-purple-400">Email</label>
            <input className="block w-full border border-slate-600 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" type='text' name='email' id='email' onChange={handleChange} required/>
            {errorData.email && <p className='error-message text-red-400 font-bold'>{errorData.email}</p>}
        </div>

        <div className='form-control'>
            <label htmlFor='password' className="block text-sm/6 font-semibold text-purple-400">Password</label>
            <input className="block w-full border border-slate-600 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" type='password' name='password' id='password' onChange={handleChange} required/>
            {errorData.password && <p className='error-message text-red-400 font-bold'>{errorData.password}</p>}
        </div>

        <div className='form-control'>
            <label htmlFor='confirm_password' className="block text-sm/6 font-semibold text-purple-400">Confirm Password</label>
            <input className="block w-full border border-slate-600 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" type='password' name='confirm_password' id='confirm_password' onChange={handleChange} required/>
            {errorData.confirm_password && <p className='error-message text-red-400 font-bold'>{errorData.confirm_password}</p>}
        </div>
        <button type='submit' className="flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mb-3 mt-3">Submit</button>
        {errorData.message && <p className='error-message text-red-400 font-bold'>{errorData.message}</p>}

        <p className="mt-10 text-center text-sm/6 text-gray-400">Already have an account? <Link className="font-semibold text-indigo-400 hover:text-indigo-300" to='/auth/sign-in/'>Sign In</Link></p>
    </form>
    </div>
    </div>
    </>
)
}

export default SignUp