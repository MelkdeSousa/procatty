import { Router } from 'express'
import { isAdmin } from '../../middleware/admin'

import AddressController from '../../controllers/Address'

const routes = Router()

const addressController = new AddressController()

routes.get('/address', addressController.getAddresses)
routes.get('/address/:id', addressController.getAddressById)

routes.post('/address', isAdmin, addressController.createAddress)
routes.put('/address', isAdmin, addressController.updateAddress)
routes.delete('/address/:id', isAdmin, addressController.deleteAddress)

export default routes
