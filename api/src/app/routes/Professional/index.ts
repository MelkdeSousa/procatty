import { Router } from 'express'

import ProfessionalController from '../../controllers/Professional'

const routes = Router()

const professionalController = new ProfessionalController()

routes.get('/professional', professionalController.getProfessionals)
routes.get('/professional/:id', professionalController.getProfessionalById)
routes.post('/professional', professionalController.createProfessional)
routes.put('/professional', professionalController.updateProfessional)
routes.delete('/professional/:id', professionalController.deleteProfessional)

export default routes
