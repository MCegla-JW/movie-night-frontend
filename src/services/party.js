import axios from 'axios'

import { getToken } from '../utils/token'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/parties/`
})

// * Party ------------------------------------

export const PartyIndex = () => {
    return api.get('', {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })
}

export const PartyCreate = async (formData) => {
    return api.post('', formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })
}

export const partyShow = (partyId) => {
  return api.get(`/${partyId}/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const partyUpdate = (partyId, formData) => {
  return api.put(`/${partyId}/`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}

export const partyDelete = (partyId) => {
  return api.delete(`/${partyId}/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
}