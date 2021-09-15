import { Router } from 'express'
import professionalRoutes from './Professional'
import addressRoutes from './Address'
import availableScheduleRoutes from './AvailableSchedule'
import adminRoutes from './Admin'

const routes = Router()

routes.use('/api/v1', [professionalRoutes, addressRoutes, availableScheduleRoutes, adminRoutes])

export default routes
