import type { ErrorRequestHandler } from 'express'

import fs from 'node:fs'
import path from 'node:path'

import { translateText } from '@/shared'

import { ZodError } from 'zod'

type addLogInDatabaseProps = {
  message: string
  statusCode: number
  url: string
  requestMethod: string
  path?: string
}

const addLogInDatabase = async (log: addLogInDatabaseProps) => {
  const logMessage = `${new Date().toISOString()} - ${JSON.stringify(log, null, 2)}\n`

  const logFilePath = path.join(__dirname, '../logs', 'log.txt')

  fs.appendFileSync(logFilePath, logMessage, { encoding: 'utf8' })

  return logMessage
}

export const exceptionValidation: ErrorRequestHandler = async (err, req, res, next) => {
  if (err instanceof ZodError) {
    await addLogInDatabase({
      message: err.errors[0].message,
      path: err.errors[0].path.join('.'),
      statusCode: 400,
      url: req.url,
      requestMethod: req.method
    })

    return res.status(400).json({
      error: `${err.errors[0].path} ${await translateText(err.errors[0].message)}`
    })
  }

  return next(err)
}
