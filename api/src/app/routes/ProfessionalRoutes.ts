import { Router } from 'express'

import ProfessionalController from '../controllers/Professional'

const routes = Router()

const professionalController = new ProfessionalController()

routes.get('/professional', professionalController.getProfessionals)
routes.post('/professional', professionalController.createProfessional)
routes.put('/professional', professionalController.updateProfessional)

export default routes
