import { Link } from "react-router"

const NotFound = () => {
    return (
        <>
        <div className="pb-24 min-h-screen bg-gray-900 px-4">
        <div className="flex flex-col py-7 gap-4">
        <h1 className="text-center text-xl font-bold text-gray-400">Opps! Page not found.</h1>
        <button type="button" className="flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mb-3 mt-3"><Link to='/movies'>Back to Home</Link></button>
        </div>
        </div>
        </>
    )
}

export default NotFound