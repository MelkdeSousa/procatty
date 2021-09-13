import { Router } from 'express'
import ProfessionalRoutes from './Professional'
import AddressRoutes from './Address'

const routes = Router()

routes.use('/api/v1', [ProfessionalRoutes, AddressRoutes])

export default routes
