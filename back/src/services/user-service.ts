import { CustomErrors, Errors } from '@/errors'
import { prisma } from '@/lib/prisma'
import { UserRepository } from '@/repositories/user-repository'
import { hash } from 'bcrypt'

interface ICreateUser {
  name: string,
  email: string,
  password: string
}

export async function register({ name, email, password }: ICreateUser) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (userWithSameEmail) {
    throw new CustomErrors(Errors.USER_ALREADY_EXISTS)
  }

  const userRepository = new UserRepository()
  await userRepository.create({
    email,
    name,
    password_hash,
  })

  const userCreated = userRepository.findByEmail(email)

  return userCreated
}
