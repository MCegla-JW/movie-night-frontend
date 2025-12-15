import { Link } from "react-router"

const NavBar = () => {
    return (
        <>
        <header>
            <div id='brand-logo'>
                <Link to='/'>🎬</Link>
            </div>
        </header>
        <h1>MovieNight</h1>
        </>
    )
}

export default NavBar 