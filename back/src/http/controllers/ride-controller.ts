import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CustomErrors } from '@/errors'
import { confirmRide, estimateValue, getHistory } from '@/services/ride-service'

export const estimateBodySchema = z.object({
  origin: z.string(),
  destination: z.string(),
  customer_id: z.number()
})

export async function estimate(request: FastifyRequest, reply: FastifyReply) {
  const { origin, destination, customer_id } = estimateBodySchema.parse(request.body)

  try {
    
    const response = await estimateValue({ customer_id, origin, destination })

    return reply.status(200).send({description: 'Operação realizada com sucesso', response})

  } catch (error) {
    if (error instanceof CustomErrors) {
      return reply.status(error.getError().statusCode).send(error.getError())
    }

    throw error
  }

}

export const confirmBodySchema = z.object({
  origin: z.string(),
  destination: z.string(),
  customer_id: z.string(),
  distance: z.number(),
  duration: z.string(),
  driver: z.object({
    id: z.number(),
    name: z.string()
  }),
  value: z.number()
})

export async function confirm(request: FastifyRequest, reply: FastifyReply) {

  const { origin, destination, customer_id, distance, duration, driver, value } = confirmBodySchema.parse(request.body)

  try {
    const ride = await confirmRide({ customer_id, destination, distance, duration, driver, origin, value })

    return reply.status(201).send(ride)
  } catch (error) {
    if (error instanceof CustomErrors) {
      return reply.status(error.getError().statusCode).send(error.getError())
    }

    throw error
  }

}

export const historyParamsSchema = z.object({
  customer_id: z.string(),
})
export const historyQuerySchema = z.object({
  driver_id: z.string().optional()
})

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const { customer_id } = historyParamsSchema.parse(request.params)
  const { driver_id } = historyQuerySchema.parse(request.query)

  try {
    const rides = await getHistory({ customer_id, driver_id })

    return reply.status(200).send(rides)
    
  } catch (error) {
    if (error instanceof CustomErrors) {
      return reply.status(error.getError().statusCode).send(error.getError())
    }

    throw error
  }
}
