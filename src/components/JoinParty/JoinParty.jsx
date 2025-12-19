import { useEffect, useContext, useState } from 'react'
import { useParams, useNavigate, Navigate, useLocation } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { joinParty } from '../../services/party'
import LoadingIcon from '../LoadingIcon/LoadingIcon'

const JoinParty = () => {
  const { joinCode } = useParams()
  const { user } = useContext(UserContext)
  const [hasJoined, setHasJoined] = useState(false)
  const navigate = useNavigate()
  console.log('JOIN PARTY CALLED')

  useEffect(() => {
    const join = async () => {
      try {
        if (hasJoined) return 
        setHasJoined(true)
        const { data } = await joinParty(joinCode)
        console.log('USER JOINING...')
        // redirect to the party details page
        navigate(`/parties/${data.party_id}`)
      } catch (err) {
        console.error(err)
        navigate('/page-not-found')
      }
    }
    join()

  }, [joinCode, user, navigate])

  if (!user) return <Navigate to="/auth/sign-in" />

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <LoadingIcon />
    </div>
  )
}

export default JoinParty
