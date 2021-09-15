import { Router } from 'express'
import { isAdmin } from '../../middleware/admin'

import ProfessionalController from '../../controllers/Professional'

const routes = Router()

const professionalController = new ProfessionalController()

routes.get('/professional', professionalController.getProfessionals)
routes.get('/professional/:id', professionalController.getProfessionalById)
routes.post('/professional/:id/schedule', professionalController.createScheduleToProfessional)

routes.post('/professional', isAdmin, professionalController.createProfessional)
routes.put('/professional', isAdmin, professionalController.updateProfessional)
routes.delete('/professional/:id', isAdmin, professionalController.deleteProfessional)

export default routes
