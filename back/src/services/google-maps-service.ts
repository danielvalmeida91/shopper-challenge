import { env } from '@/env'
import axios from 'axios'

const BASE_URL = 'https://maps.googleapis.com/maps/api'

export const googleMapsService = {
  geocodeAddress: async (address: string) => {
    const response = await axios.get(`${BASE_URL}/geocode/json`, {
      params: {
        address,
        key: env.GOOGLE_API_KEY
      },
    })
  
    const { results } = response.data
  
    if (!results || results.length === 0) {
      throw new Error('ADDRESS_NOT_FOUND')
    }
  
    const fullAddress = results[0].formatted_address
    const location = results[0].geometry.location
  
    return {
      address: fullAddress,
      latitude: location.lat,
      longitude: location.lng
    }
  },

  reverseGeocode: async (lat: string, lng: string) => {
    const response = await axios.get(`${BASE_URL}/geocode/json`, {
      params: {
        latlng: `${lat},${lng}`,
        key: env.GOOGLE_API_KEY,
      },
    })

    return response.data
  },

  calculateDistance: async (origin: string, destination: string) => {
    const response = await axios.get(`${BASE_URL}/distancematrix/json?origins=${origin}&destinations=${destination}`, {
      params: {
        key: env.GOOGLE_API_KEY,
        mode: 'driving'
      },
    })
    return response.data
  },
}
