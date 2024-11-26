import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export function findByEmail(email: string) {
  return prisma.customer.findUnique({
    where: {
      email
    }
  })
}


export class CustomerRepository {
  findByEmail(email: string) {
    return prisma.customer.findUnique({
      where: {
        email
      }
    })
  }
  create(customer: Prisma.CustomerCreateInput) {
    return prisma.customer.create({
      data: customer
    })
  }
}
