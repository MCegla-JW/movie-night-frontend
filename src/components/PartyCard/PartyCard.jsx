import { Link } from 'react-router'

const PartyCard = ({ party}) => {
    return (
        <Link to={`/parties/${party.id}`} className='block'>
            <div className='bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-4 shadow-md cursor-pointer'>
                <h2 className='text-lg font-bold text-white'>{party.title}</h2>
                <p className='text-gray-300 mt-1'>{party.date}</p>
                <p className='text-gray-400 mt-2'>{party.members.length} {party.members.length === 1 ? 'member' : 'members'}</p>
            </div>
        </Link>
    )
}

export default PartyCard;
