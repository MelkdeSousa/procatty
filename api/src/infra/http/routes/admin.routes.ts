import express from 'express'

import { adaptRoute } from '@infra/adapter/route-express'

import { makeCreateAdminController } from '@infra/http/factories/controller/make-create-admin'

const adminRouter = express.Router()

adminRouter.post('/', adaptRoute(makeCreateAdminController()))

export { adminRouter }
