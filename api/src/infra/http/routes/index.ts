import { Router } from 'express'

import { adminRouter } from './admin.routes'

const router = Router()

router.use('/admin', adminRouter)

router.get('/', (_req, res) => {
  return res.json({ message: 'ok' })
})

export { router }
