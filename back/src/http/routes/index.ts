import { FastifyInstance } from 'fastify'
import { create as createCustomer } from '@/http/controllers/customer-controller'
import  { create as createDriver, list } from '@/http/controllers/driver-controller'
import { getDistanceBetweenTwoPoints, getGeocodeByAddress, getGeocodeByLatitudeAndLongitude } from '../controllers/google-maps-controller'
import { confirm, estimate, history } from '../controllers/ride-controller'

export async function routes(app: FastifyInstance) {
  app.post('/api/customer', createCustomer)
  app.post('/api/driver', createDriver)
  app.get('/api/drivers', list)
  app.get('/api/geocode', getGeocodeByAddress)
  app.get('/api/geocode-by-lat-and-lng', getGeocodeByLatitudeAndLongitude)
  app.get('/api/distance', getDistanceBetweenTwoPoints)
  app.post('/api/ride/estimate', estimate)
  app.patch('/api/ride/confirm', confirm)
  app.get('/api/ride/:customer_id', history)
}
