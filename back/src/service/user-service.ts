import { prisma } from "@/app"
import { IUserDTO } from "@/dto/user-dto"
import { Erros, MyError } from "@/errors"
import { UserRepository } from "@/repository/user-repository"
import { Prisma } from "@prisma/client"

export class UserService {
  private userRepository: UserRepository
  constructor() {
    this.userRepository =  new UserRepository()
  }

  async createUser(user: IUserDTO): Promise<any> {
    try {
      
      const userExists = await this.userRepository.findByEmail(user.email)

      if(userExists) {
        throw new MyError(Erros.USER_ALREADY_EXISTS)
      }

      await this.userRepository.create(user)

      return await prisma.user.findUnique({
        where: {
          email: user.email
        }
      })
    } catch (error) {
      // verify what kind of error it is
      if(error instanceof MyError) throw error
    }

  }
}
