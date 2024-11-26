import { CustomErrors } from '@/errors'
import { googleMapsService } from '@/services/google-maps-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getGeocodeByAddress(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    address: z.string()
  })

  const { address } = requestBodySchema.parse(request.query)

  try {
    const response = await googleMapsService.geocodeAddress(address)

    return reply.status(200).send(response)
  } catch (error) {
    if (error instanceof CustomErrors) {
      return reply.status(error.getError().statusCode).send(error.getError())
    }

    throw error
  }
}

export async function getGeocodeByLatitudeAndLongitude(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    lat: z.string(),
    lng: z.string()
  })

  const { lat, lng } = requestBodySchema.parse(request.query)

  try {
    const response = await googleMapsService.reverseGeocode(lat, lng)

    return reply.status(200).send(response)
  } catch (error) {
    if (error instanceof CustomErrors) {
      return reply.status(error.getError().statusCode).send(error.getError())
    }

    throw error
  }
}

export async function getDistanceBetweenTwoPoints(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    origin: z.string(),
    destination: z.string()
  })

  const { origin, destination } = requestBodySchema.parse(request.query)

  try {
    const response = await googleMapsService.calculateDistance(origin, destination)

    return reply.status(200).send(response)
  } catch (error) {
    if (error instanceof CustomErrors) {
      return reply.status(error.getError().statusCode).send(error.getError())
    }

    throw error
  }
}
