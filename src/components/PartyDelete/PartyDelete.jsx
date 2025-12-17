import { useState } from 'react'
import { partyDelete } from '../../services/party'
import { useNavigate } from 'react-router'

const DeleteParty = ({ partyId }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [errorData, setErrorData] = useState({})

    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            await partyDelete(partyId)
            navigate('/parties/')
        } catch (error) {
            console.log(error)
            const { status, data } = error.response
            if (status === 500) {
                setErrorData({ message: 'Something went wrong. Please try again.'})
            } else {
                setErrorData(data)
            }
        } finally {
            setIsLoading(false)
        }
    }
return (
     <>
      <button onClick={handleDelete}>
        Delete Party
      </button>
      {errorData.message && <p className='error-message'>{errorData.message}</p>}
    </>   
)
}

export default DeleteParty