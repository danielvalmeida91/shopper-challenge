import { CustomErrors, Errors } from '@/errors'
import { registerBodySchema } from '@/http/controllers/driver-controller'
import { prisma } from '@/lib/prisma'
import { DriverRepository } from '@/repositories/driver-repository'
import { z } from 'zod'

interface ICalculateRide {
  distance: string | number
}

export async function getDriversByDistance({ distance }: ICalculateRide) {
  if(!distance){
    throw new CustomErrors(Errors.DISTANCE_NOT_FOUND)
  }

  const getDrivers = await prisma.driver.findMany({
    where: {
      min_km: {
        lte: Number(distance / 1000)
      }
    },
    include: {
      Rating: true
    }
  })

  // if(!getDrivers.length){
  //   throw new CustomErrors(Errors.DRIVER_NOT_FOUND)
  // }
  
  const driversWithCost = getDrivers.map(driver => {
    const hasRating = driver.Rating.length > 0
    const lastComment = driver?.Rating[0]?.description ?? ''
    const averageScore = !hasRating ? 0 : driver.Rating.reduce((acc, curr) => acc + curr.score, 0) / driver.Rating.length
    return({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.car,
      review: {
        rating: Number(averageScore),
        comment: lastComment
      },
      value: driver.rate_per_km * Number(distance)
    })
  })
  
  driversWithCost.sort((a, b) => a.value - b.value)
  
  return driversWithCost
}


export async function getAll() {

  const driverRepository = new DriverRepository()
  const drivers = await driverRepository.findAll()

  return drivers
}


export async function register({ car, description, minKm, name, ratePerKm }: z.infer<typeof registerBodySchema>) {

  const driverRepository = new DriverRepository()
  await driverRepository.create({
    car,
    description,
    min_km: minKm,
    name,
    rate_per_km: ratePerKm
  })

  return {
    success: true
  }
}
