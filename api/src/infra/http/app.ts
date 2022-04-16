import cors from 'cors'
import { config } from 'dotenv-flow'
import express from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc, { Options } from 'swagger-jsdoc'

config({ silent: true })

import { router } from './routes'
import { resolve } from 'path'

const app = express()

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Procatty API',
      version: '1.0.0',
    },
  },
  apis: [resolve(__dirname, 'routes', '*.routes.ts')],
};

const spec = swaggerJSDoc(options);

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(spec))

app.use(
  cors({
    exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length'],
  })
)

app.use(
  express.json({
    type: ['application/json', 'text/plain'],
  })
)

app.use(router)


export { app }
