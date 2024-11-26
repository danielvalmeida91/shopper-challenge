import { CustomErrors, Errors } from '@/errors'
import { prisma } from '@/lib/prisma'

interface ICalculateRide {
  distance: string | number
}

export async function getDriversByDistance({ distance }: ICalculateRide) {
  if(!distance){
    throw new CustomErrors(Errors.DISTANCE_NOT_FOUND)
  }

  const getDrivers = await prisma.driver.findMany({
    where: {
      minKm: {
        lte: Number(distance / 1000)
      }
    },
    include: {
      Rating: true
    }
  })

  
  if(!getDrivers.length){
    throw new CustomErrors(Errors.DRIVER_NOT_FOUND)
  }
  
  const driversWithCost = getDrivers.map(driver => ({
    id: driver.id,
    name: driver.name,
    description: driver.description,
    vehicle: driver.car,
    review: {
      rating: driver.Rating[0].score ?? '',
      comment: driver.Rating[0].description ?? ''
    },
    value: driver.rate_per_km * Number(distance)
  }))
  
  driversWithCost.sort((a, b) => a.value - b.value)
  
  return driversWithCost
}
