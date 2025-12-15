import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'
import { Link, Navigate } from 'react-router'

const AccountPage = () => {
    const { user, signOut } = useContext(UserContext)
    if (!user) {
        return <Navigate to='/auth/sign-up/' />
    }
    return (
        <>
            <div>
            <h4>Your Username: {user.username}</h4>
            <h4>Your Email: {user.email}</h4>
            <button>Edit Profile</button>
            <Link to='/auth/sign-in/' onClick={signOut}><button>Sign Out</button></Link>
            </div>
            </>
    )
}

export default AccountPage