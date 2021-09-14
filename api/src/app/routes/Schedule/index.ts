import { Router } from 'express'

import ScheduleController from '../../controllers/Schedule'

const routes = Router()

const scheduleController = new ScheduleController()

routes.get('/schedule', scheduleController.getSchedules)
routes.get('/schedule/:id', scheduleController.getScheduleById)
routes.post('/schedule', scheduleController.createSchedule)
routes.put('/schedule', scheduleController.updateSchedule)
routes.delete('/schedule/:id', scheduleController.deleteSchedule)

export default routes
