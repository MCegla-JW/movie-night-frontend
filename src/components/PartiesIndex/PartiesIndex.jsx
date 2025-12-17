import LoadingIcon from "../LoadingIcon/LoadingIcon"
import { LuPopcorn } from "react-icons/lu"
import PartyCard from "../PartyCard/PartyCard"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../contexts/UserContext"
import { PartyIndex } from "../../services/party"
import { useNavigate, Navigate } from "react-router"


const PartiesIndex = () => {
    const { user } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [parties, setParties] = useState([])
    const [selectedParty, setSelectedParty] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const getPartyIndex = async () => {
            try {
                setIsLoading(true)
                const response = await PartyIndex()
                setParties(response.data)
                console.log(response)
        } catch (err) {
            console.log('Failed to load parties', err)
        } finally {
            setIsLoading(false)
        }
        }
        getPartyIndex()
    },[])


    if (!user) return <Navigate to="/auth/sign-in" />

    return (
        <div className="pb-24 min-h-screen bg-gray-900 px-4">
        <div className="flex flex-col py-7 gap-4">
        <h1 className="text-center text-xl font-bold text-gray-400">Watch Parties</h1>
        <button className="flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mb-3 mt-3 btn" onClick={() => navigate('/parties/create')}> + Create</button>
        {isLoading ? (
    <div className='flex justify-center items-center py-20'>
        <LoadingIcon />
    </div>
) : parties.length === 0 ? (
    <div className="flex flex-col py-7 gap-4 text-center text-xl font-bold text-gray-400 items-center">
        <LuPopcorn size={60}/>
        <h2>No watch parties yet!</h2>
        <p>Create a party!</p>
    </div>
) : (
    <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-3 bg-gray-900'>
        {parties.map(party => (
            <PartyCard key={party.id} party={party} onClick={setSelectedParty} />
        ))}
        </div>
)}
</div>
</div>
)}

export default PartiesIndex
