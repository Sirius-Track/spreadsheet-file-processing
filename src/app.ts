import express from 'express'

import cors from 'cors'
import morgan from 'morgan'

import { router } from './router'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(router)

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())
app.options('*', cors())

export default app
