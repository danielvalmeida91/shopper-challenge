import { CustomErrors, Errors } from '@/errors'
import { googleMapsService } from './google-maps-service'
import { getDriversByDistance } from './driver-service'
import { z } from 'zod'
import { confirmBodySchema, estimateBodySchema } from '@/http/controllers/ride-controller'
import { findDriverById } from '@/repositories/driver-repository'
import { RideRepository } from '@/repositories/ride-repository'

export async function estimateValue({ customer_id, origin, destination }: z.infer<typeof estimateBodySchema>) {
  if(origin === destination){
    throw new CustomErrors(Errors.INVALID_DATA)
  }

  const [routeResponse, geocodeOrigin, geocodeDestination ] = await Promise.all([
    googleMapsService.calculateDistance(origin, destination),
    googleMapsService.geocodeAddress(origin),
    googleMapsService.geocodeAddress(destination)
  ])

  const distance = routeResponse.rows[0].elements[0].distance.value

  const allowedDrivers = await getDriversByDistance({ distance})

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

export async function confirmRide({ customer_id, destination, distance, duration, driver, origin, value}: z.infer<typeof confirmBodySchema>) {
  const driverExists = await findDriverById(driver.id)

  if(!driverExists){
    throw new CustomErrors(Errors.DRIVER_NOT_FOUND)
  }

  if(driverExists?.minKm > Number(distance / 1000)){
    throw new CustomErrors(Errors.INVALID_DISTANCE)
  }

  if(origin === destination || !customer_id || !origin || !destination){
    throw new CustomErrors(Errors.INVALID_DATA)
  }

  const rideRepository = new RideRepository()

  await rideRepository.create({
    customer_id: Number(customer_id),
    destination,
    distance,
    duration,
    driver_id: driver.id,
    origin,
    value
  })

  return { success: true }
}

interface IGetHistory {
  customer_id: string
  driver_id?: string
}

export async function getHistory({customer_id, driver_id}: IGetHistory) {
  if(!customer_id){
    throw new CustomErrors(Errors.INVALID_DATA)
  }

  if(driver_id){
    const driverIsValid = await findDriverById(Number(driver_id))

    if(!driverIsValid){
      throw new CustomErrors(Errors.DRIVER_NOT_FOUND)
    }
  }

  const rideRepository = new RideRepository()

  const history = await rideRepository.history(Number(customer_id), Number(driver_id))

  const formattedHistory = {
    customer_id: String(customer_id),
    rides: history
  }

  return formattedHistory
}
