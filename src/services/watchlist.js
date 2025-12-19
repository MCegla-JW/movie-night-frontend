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
    return await api.post(`/${movie.id}/`, {}, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })
}

export const WatchlistDelete = async (tmdbId) => {
    return await api.delete(`/${tmdbId}/`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })
}