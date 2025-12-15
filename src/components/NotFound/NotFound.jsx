import { Link } from "react-router"

const NotFound = () => {
    return (
        <>
        <h1>Oops! Page not found.</h1>
        <Link to='/'>Back to Home</Link>
        </>
    )
}

export default NotFound