import { Link } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import { useContext } from "react"

const Discover = () => {
    const { user } = useContext(UserContext)
    console.log('User:',  user)
    return (
        <>
        <h1>Popular This Week</h1>
        <button>Search</button>
        </>
    )
}

export default Discover