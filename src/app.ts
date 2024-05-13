import express from 'express'

import cors from 'cors'
import morgan from 'morgan'

import { router } from './router'
import { exception, exceptionValidation, notFound } from './middlewares'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())
app.options('*', cors())
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'])

app.use(router)

app.use(notFound)
app.use(exceptionValidation)
app.use(exception)

export default app
