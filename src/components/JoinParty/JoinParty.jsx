import { useEffect, useContext } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { joinParty } from '../../services/party'
import LoadingIcon from '../LoadingIcon/LoadingIcon'

const JoinParty = () => {
  const { joinCode } = useParams()
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    const join = async () => {
      try {
        const { data } = await joinParty(joinCode)
        // redirect to the party details page
        navigate(`/parties/${data.party_id}`)
      } catch (err) {
        console.error(err)
        navigate('/page-not-found')
      }
    }

    if (user) {
      join()
    }
  }, [joinCode, user, navigate])

  if (!user) return <Navigate to="/auth/sign-in" />

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <LoadingIcon />
    </div>
  )
}

export default JoinParty
