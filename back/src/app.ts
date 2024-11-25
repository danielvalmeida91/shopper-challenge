import fastify from 'fastify'
import { routes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
import { Errors } from './errors'

export const app = fastify()

app.register(routes)

app.setErrorHandler((error, _, reply) => {
  if(error instanceof ZodError){
    return reply.status(Errors.INVALID_DATA.statusCode).send({
      'error_code': 'INVALID_DATA',
      'error_description': Errors.INVALID_DATA.message
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
