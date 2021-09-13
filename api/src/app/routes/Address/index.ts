import { Router } from 'express'

import AddressController from '../../controllers/Address'

const routes = Router()

const addressController = new AddressController()

routes.get('/address', addressController.getAddresses)
routes.get('/address/:id', addressController.getAddressById)
routes.post('/address', addressController.createAddress)
routes.put('/address', addressController.updateAddress)
routes.delete('/address/:id', addressController.deleteAddress)

export default routes
