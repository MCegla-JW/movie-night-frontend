import axios from 'axios'

import { getToken } from '../utils/token'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/watchlist`
})

// * Watchlist ------------------------------------

export const WatchlistIndex = () => {
    return api.get('', {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })
}

export const WatchlistCreate = (movie) => {
    return api.post(`/${movie.id}/`, null, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}