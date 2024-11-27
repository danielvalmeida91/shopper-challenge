import cors from '@fastify/cors'
import { app } from './app'
import { env } from './env'

await app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
})

app.listen({
  host: '0.0.0.0',
  port: env.PORT
}).then(() => {
  console.log('🚀 HTTP Server Running on PORT: ' + env.PORT)
})
