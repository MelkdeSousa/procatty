import { Router } from 'express'
import professionalRoutes from './Professional'
import addressRoutes from './Address'
import scheduleRoutes from './Schedule'

const routes = Router()

routes.use('/api/v1', [professionalRoutes, addressRoutes, scheduleRoutes])

export default routes
