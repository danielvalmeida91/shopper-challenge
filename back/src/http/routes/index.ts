import { FastifyInstance } from 'fastify'
import { create as createCustomer } from '@/http/controllers/customer-controller'
import  { create as createDriver } from '@/http/controllers/driver-controller'
import { getDistanceBetweenTwoPoints, getGeocodeByAddress, getGeocodeByLatitudeAndLongitude } from '../controllers/google-maps-controller'
import { confirm, estimate, history } from '../controllers/ride-controller'

export async function routes(app: FastifyInstance) {
  app.post('/customer', createCustomer)
  app.post('/driver', createDriver)
  app.get('/api/geocode', getGeocodeByAddress)
  app.get('/api/geocode-by-latitude-and-longitude', getGeocodeByLatitudeAndLongitude)
  app.get('/api/distance', getDistanceBetweenTwoPoints)
  app.post('/ride/estimate', estimate)
  app.patch('/ride/confirm', confirm)
  app.get('/ride/:customer_id', history)
}
