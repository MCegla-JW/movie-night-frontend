import { Link } from "react-router"
import { LuPopcorn } from "react-icons/lu"
import { VscAccount } from "react-icons/vsc"
import { MdOutlineLocalMovies } from "react-icons/md"
import { FaRegHeart } from "react-icons/fa6"



const BottomNavBar = () => {
    return (
        <nav className="fixed bottom-0 left-0 w-full h-24 bg-[#232b32] border-t border-white/10">
            <div className="flex justify-around py-2">
            <Link to='/movies' className='flex flex-col items-center text-white text-xs'><FaRegHeart size={40}/><span className='mt-1'>Discover</span></Link>
            <Link to='/parties' className='flex flex-col items-center text-white text-xs'><LuPopcorn size={40}/><span className='mt-1'>Parties</span></Link>
            <Link to='/watchlist' className='flex flex-col items-center text-white text-xs'><MdOutlineLocalMovies size={40}/><span className='mt-1'>My Movies</span></Link>
            <Link to='/auth/account' className='flex flex-col items-center text-white text-xs'><VscAccount size={40}/><span className='mt-1'>Account</span></Link>
            </div>
        </nav>
    )
}

export default BottomNavBar

