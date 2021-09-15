import { Router } from 'express'
import { isAdmin } from '../../middleware/admin'

import AdminController from '../../controllers/Admin'

const routes = Router()

const adminController = new AdminController()

routes.post('/admin', isAdmin, adminController.createAdmin)
routes.post('/admin/session', adminController.createSession)

export default routes
