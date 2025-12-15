import { Link } from "react-router"

const BottomNavBar = () => {
    return (
        <div id='nav-links'>
            <Link to='/movies'>Discover</Link>
            <Link to='/parties'>Parties</Link>
            <Link to='/watchlist'>My Movies</Link>
            <Link to='/auth/account'>Account</Link>
        </div>
    )
}

export default BottomNavBar