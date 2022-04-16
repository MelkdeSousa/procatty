import express from 'express'

import { adaptRoute } from '@infra/adapter/route-express'

import { makeCreateAdminController } from '@infra/http/factories/controller/make-create-admin'

const adminRouter = express.Router()

/**
 * @swagger
 * components:
 *    schemas:
 *      Admin:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *          - username
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          username:
 *            type: string
 *          avatar:
 *            type: string
 */

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management
 */

/**
 * @swagger
 * /admin:
 *   post:
 *     summary: Create an admin
 *     tags: [Admin]
 *     description: Create an admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
adminRouter.post('/', adaptRoute(makeCreateAdminController()))

export { adminRouter }
