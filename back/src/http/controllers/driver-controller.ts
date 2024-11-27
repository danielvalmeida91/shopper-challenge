import { CustomErrors } from '@/errors'
import { getAll, register } from '@/services/driver-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const registerBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  car: z.string(),
  ratePerKm: z.number().multipleOf(0.01),
  minKm: z.number().int()
})

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { name, car, description, minKm, ratePerKm } = registerBodySchema.parse(request.body)

  try {
    const driver = await register({ name, car, description, minKm, ratePerKm })

    return reply.status(201).send(driver)
  } catch (error) {
    if (error instanceof CustomErrors) {
      return reply.status(error.getError().statusCode).send(error.getError())
    }

    throw error
  }
}


export async function list(request: FastifyRequest, reply: FastifyReply) {

  try {
    const driver = await getAll()

    return reply.status(201).send(driver)
  } catch (error) {
    if (error instanceof CustomErrors) {
      return reply.status(error.getError().statusCode).send(error.getError())
    }

    throw error
  }
}
