import { FastifyInstance } from 'fastify'
import { create } from '@/http/controllers/user-controller'

export async function routes(app: FastifyInstance) {
  app.post('/users', create)
}
