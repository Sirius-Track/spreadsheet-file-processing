import express from 'express'

import cors from 'cors'
import morgan from 'morgan'

import { router } from './router'
import { exception, exceptionValidation, notFound } from './middlewares'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(router)

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())
app.options('*', cors())

app.use(exceptionValidation)
app.use(exception)
app.use(notFound)

export default app
