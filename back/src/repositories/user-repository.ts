import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email
    }
  })
}


export class UserRepository {
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email
      }
    })
  }
  create(user: Prisma.UserCreateInput) {
    return prisma.user.create({
      data: user
    })
  }
}
