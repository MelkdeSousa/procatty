import { Router } from 'express'
import ProfessionalRoutes from './ProfessionalRoutes'

const routes = Router()

routes.use('/api/v1', [ProfessionalRoutes])

export default routes
