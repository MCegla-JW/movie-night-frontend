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
            <div className="w-full px-4 bg-gray-900 min-h-screen flex items-center justify-center flex-col pb-40">
            <h4 className="mb-6 text-center text-xl font-bold text-gray-400 pt-2">Your Username: {user.username}</h4>
            <h4 className="mb-6 text-center text-xl font-bold text-gray-400">Your Email: {user.email}</h4>
            <button className="flex w-full justify-center rounded-md bg-purple-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 pb-3">Edit Profile</button>
            <Link to='/auth/sign-in/' onClick={signOut} className="flex w-full justify-center rounded-md bg-purple-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 pb-3 mt-3"><button>Sign Out</button></Link>
            </div>
            </>
    )
}

export default AccountPage