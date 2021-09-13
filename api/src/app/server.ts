import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import routes from "./routes"

dotenv.config({ path: '../../.env' })

const PORT = process.env.PORT || 3333

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use(routes)

app.listen(PORT, () => console.info(`Server running at ${PORT}`))
