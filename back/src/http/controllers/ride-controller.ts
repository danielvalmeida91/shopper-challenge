import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CustomErrors } from '@/errors'
import { estimateValue } from '@/services/ride-service'

export async function estimate(request: FastifyRequest, reply: FastifyReply) {
  const estimateBodySchema = z.object({
    origin: z.string(),
    destination: z.string(),
    customer_id: z.number()
  })

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
