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
    const [myParties, setMyParties] = useState([])
    const [joinedParties, setJoinedParties] = useState([])
    const [parties, setParties] = useState([])
    const [selectedParty, setSelectedParty] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const getPartyIndex = async () => {
            try {
                setIsLoading(true)
                const response = await PartyIndex()
                const allParties = response.data
                const created = allParties.filter(party => party.creator?.id === user.id)
                const joined = allParties.filter(party => party.creator?.id !== user.id && party.members.some(member => member.id === user.id))
                const sortyByDate = (a,b) => new Date(a.date) - new Date(b.date)
                created.sort(sortyByDate)
                joined.sort(sortyByDate)
                
                setParties(allParties)
                setMyParties(created)
                setJoinedParties(joined)
                console.log(response)
        } catch (err) {
            console.log('Failed to load parties', err)
        } finally {
            setIsLoading(false)
        }
        }
        getPartyIndex()
    },[user])

    if (!user) return <Navigate to="/auth/sign-in" />
    const renderPartySection = (title, partyList) => (
        <>
        <h2 className="text-center text-xl font-bold text-gray-400 mt-4">{title}</h2>
        {partyList.length === 0 ? (
            <p className='text-center text-gray-400 mb-4'>No parties yet!</p>
        ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-3'>
                {partyList.map(party=> (
                    <PartyCard key={party.id} party={party} onClick={setSelectedParty} />
                ))}
        </div>
    )}
        </>
    )
    return (
        <div className="flex flex-col h-screen bg-gray-900 px-4 pt-20">
        <div className="flex flex-col py-7 gap-4">
        <h1 className="text-center text-xl font-bold text-gray-400">Watch Parties</h1>
        <button className="flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mb-3 mt-3 btn" onClick={() => navigate('/parties/create')}> + Create</button>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
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
    <>
    {renderPartySection('My Parties', myParties)}
    {renderPartySection('Joined Parties', joinedParties)}
    </>
)}
</div>
</div>
)}

export default PartiesIndex
