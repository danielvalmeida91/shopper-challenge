import { CustomErrors, Errors } from '@/errors'
import { googleMapsService } from './google-maps-service'
import { calculateRide } from './driver-service'

interface IEstimateRide {
  origin: string,
  destination: string,
  customer_id: number
}

export async function estimateValue({ customer_id, origin, destination }: IEstimateRide) {
  if(origin === destination){
    throw new CustomErrors(Errors.ORIGIN_AND_DESTINATION_ARE_THE_SAME)
  }

  const [routeResponse, geocodeOrigin, geocodeDestination ] = await Promise.all([
    googleMapsService.calculateDistance(origin, destination),
    googleMapsService.geocodeAddress(origin),
    googleMapsService.geocodeAddress(destination)
  ])

  const distance = routeResponse.rows[0].elements[0].distance.value

  const allowedDrivers = await calculateRide({ distance})

  const formattedResponse = {
    origin: {
      latitude: geocodeOrigin.latitude,
      longitude: geocodeOrigin.longitude
    },
    destination: {
      latitude: geocodeDestination.latitude,
      longitude: geocodeDestination.longitude
    },
    distance,
    duration: routeResponse.rows[0].elements[0].duration.value,
    options: allowedDrivers,
    customer_id,
    routeResponse
  }
  
  return formattedResponse
}
