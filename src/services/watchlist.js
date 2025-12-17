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

export const WatchlistCreate = async (movie) => {
    return await axios.post(`http://localhost:8000/watchlist/${movie.id}/`, {}, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })
}

export const WatchlistDelete = async (tmdbId) => {
    return await axios.delete(`http://localhost:8000/watchlist/${tmdbId}/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })
}