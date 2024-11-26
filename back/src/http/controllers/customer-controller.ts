import { CustomErrors } from '@/errors'
import { register } from '@/services/customer-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const user = await register({ name, email, password })

    return reply.status(201).send(user)
  } catch (error) {
    if (error instanceof CustomErrors) {
      return reply.status(error.getError().statusCode).send(error.getError())
    }

    throw error
  }
}
