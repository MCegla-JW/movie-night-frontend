import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { signInService } from '../../services/auth'
import './SignIn.css'
import { getUserFromToken, setToken } from '../../../utils/token'
import { UserContext } from '../../contexts/UserContext'
import { Link } from 'react-router'

const SignIn = () => {
    const { setUser } = useContext(UserContext)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [errorData, setErrorData] = useState({})
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const newFormData = {...formData, [e.target.name]: e.target.value }
        setFormData(newFormData)
        setErrorData({...errorData, [e.target.name]: ''})
    }

const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
        const response = await signInService(formData)
        const token = response.data.access
        if (token) setToken(token)
        setUser(getUserFromToken())
        navigate('/movies/')
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
    <h1>Sign In</h1>
    <form onSubmit={handleSubmit}>
        {errorData.message && <p className='error-message'>{errorData.message}</p>}
        <div className='form-control'>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' name='username' placeholder='username' onChange={handleChange} required/>
            {errorData.usernamee && <p className='error-message'>{errorData.username}</p>}
        </div>

        <div className='form-control'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' placeholder='password' onChange={handleChange} required/>
            {errorData.password && <p className='error-message'>{errorData.password}</p>}
        </div>
        <button type='submit'>Sign In</button>
        {errorData.message && <p className='error-message'>{errorData.message}</p>}

        <p>Don't have an account yet? <Link to='/auth/sign-up/'>Create account here!</Link></p>
    </form>
    </>
) 
}

export default SignIn