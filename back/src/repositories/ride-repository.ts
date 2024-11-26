import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class RideRepository {
  history(customer_id: number, driver_id?: number) {
    return prisma.ride.findMany({
      where: {
        customer_id,
        driver_id : driver_id ? driver_id : undefined
      },

    })
  }

  create(ride: Prisma.RideCreateInput) {
    return prisma.ride.create({
      data: ride
    })
  }
}