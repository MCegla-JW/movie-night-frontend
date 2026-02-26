import axios from "axios"
import { getToken } from "../utils/token"

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/parties/`
})

// Get voting data
export const getVotes = (partyId) => {
  return api.get(`${partyId}/votes/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

// Cast vote
export const castVote = (partyId, movieId) => {
  return api.post(
    `${partyId}/movies/${movieId}/vote/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )
}

// Remove vote
export const removeVote = (partyId, movieId) => {
  return api.delete(
    `${partyId}/movies/${movieId}/vote/`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )
}

// Break tie
export const breakTie = (partyId) => {
  return api.post(
    `${partyId}/break-tie/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )
}