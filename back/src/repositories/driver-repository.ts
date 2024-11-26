import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export function findDriverById(id: number) {
  return prisma.driver.findFirst({
    where: {
      id
    }
  })
}

export class DriverRepository {
  findById(id: number) {
    return prisma.driver.findFirst({
      where: {
        id
      }
    })
  }
  create(driver: Prisma.DriverCreateInput) {
    return prisma.driver.create({
      data: driver
    })
  }
}
