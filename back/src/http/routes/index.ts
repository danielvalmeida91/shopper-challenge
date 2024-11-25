import { FastifyInstance } from 'fastify'
import { create } from '@/http/controllers/user-controller'
import { getDistanceBetweenTwoPoints, getGeocodeByAddress, getGeocodeByLatitudeAndLongitude } from '../controllers/google-maps-controller'
import { estimate } from '../controllers/ride-controller'

export async function routes(app: FastifyInstance) {
  app.post('/users', create)
  app.get('/api/geocode', getGeocodeByAddress)
  app.get('/api/geocode-by-latitude-and-longitude', getGeocodeByLatitudeAndLongitude)
  app.get('/api/distance', getDistanceBetweenTwoPoints)
  app.post('/ride/estimate', estimate)
}
