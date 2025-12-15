import { useState } from "react";
import { useNavigate } from "react-router";
import { signUpService } from '../../services/auth'

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
    <h1>Create an account</h1>
    <form onSubmit={handleSubmit}>
    {errorData.message && <p className='error-message'>{errorData.message}</p>}
        <div className='form-control'>
            <label htmlFor='username'>Username</label>
            <input type='text' name='username' id='username' placeholder='username' onChange={handleChange} required/>
            {errorData.username && <p className='error-message'>{errorData.username}</p>}
        </div>

        <div className='form-control'>
            <label htmlFor='email'>Email</label>
            <input type='text' name='email' id='email' placeholder='email' onChange={handleChange} required/>
            {errorData.email && <p className='error-message'>{errorData.email}</p>}
        </div>

        <div className='form-control'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' placeholder='password' onChange={handleChange} required/>
            {errorData.password && <p className='error-message'>{errorData.password}</p>}
        </div>

        <div className='form-control'>
            <label htmlFor='confirm_password'>Confirm Password</label>
            <input type='password' name='confirm_password' id='confirm_password' placeholder='confirm your password' onChange={handleChange} required/>
            {errorData.confirm_password && <p className='error-message'>{errorData.confirm_password}</p>}
        </div>
        <button type='submit' className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Submit</button>
    </form>
    </>
)
}

export default SignUp