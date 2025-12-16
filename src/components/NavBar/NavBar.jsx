import { Link } from "react-router"
import { MdLocalMovies } from "react-icons/md"

const NavBar = () => {
    return (
        <>
        <header className="bg-[#232b32] px-4 py-3">
               <Link to='/movies' className='flex items-center gap-2 text-white'><MdLocalMovies size={50}/>
        <span className='text-x1 font-bold'>MovieNight</span>
        </Link>
        </header>
        </>
    )
}

export default NavBar 