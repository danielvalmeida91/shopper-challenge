import { CustomErrors, Errors } from '@/errors'
import { prisma } from '@/lib/prisma'
import { CustomerRepository } from '@/repositories/customer-repository'
import { hash } from 'bcrypt'

interface ICreateCustomer {
  name: string,
  email: string,
  password: string
}

export async function register({ name, email, password }: ICreateCustomer) {
  const password_hash = await hash(password, 6)

  const customerWithSameEmail = await prisma.customer.findUnique({
    where: {
      email
    }
  })

  if (customerWithSameEmail) {
    throw new CustomErrors(Errors.CUSTOMER_ALREADY_EXISTS)
  }

  const customerRepository = new CustomerRepository()
  await customerRepository.create({
    email,
    name,
    password_hash,
  })

  const customerCreated = customerRepository.findByEmail(email)

  return customerCreated
}
