import { prisma } from "@/app"
import { IUserDTO } from "@/dto/user-dto"

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
  create(user: IUserDTO) {
    return prisma.user.create({
      data: user
    })
  }
}
