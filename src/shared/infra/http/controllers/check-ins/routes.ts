import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { historyController } from './history/HistoryController'
import { metricsController } from './metrics/MetricsController'
import { validateController } from './validate-check-in/ValidateCheckin'
import { toCheckinController } from './to-check-in/CheckinController'
import { verifyUserRole } from '../../middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/check-ins/history', historyController)
  app.get('/check-ins/metrics', metricsController)

  app.post('/gyms/:gymId/check-ins', toCheckinController)

  app.patch('/check-ins/:checkInId/validate', { onRequest: [verifyUserRole('ADMIN')] }, validateController)
}