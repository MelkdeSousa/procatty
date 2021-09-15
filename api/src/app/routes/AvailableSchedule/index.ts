import { Router } from 'express'
import { isAdmin } from '../../middleware/admin'

import AvailableScheduleController from '../../controllers/AvailableSchedule'

const routes = Router()

const availableScheduleController = new AvailableScheduleController()

routes.get('/available-schedule', availableScheduleController.getSchedules)
routes.get('/available-schedule/:id', availableScheduleController.getScheduleById)

routes.post('/available-schedule', isAdmin, availableScheduleController.createSchedule)
routes.put('/available-schedule', isAdmin, availableScheduleController.updateSchedule)
routes.delete('/available-schedule/:id', isAdmin, availableScheduleController.deleteSchedule)

export default routes
