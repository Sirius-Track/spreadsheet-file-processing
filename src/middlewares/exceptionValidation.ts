import type { ErrorRequestHandler } from 'express'

import { translateText } from '@/shared'

import { ZodError } from 'zod'

export const exceptionValidation: ErrorRequestHandler = async (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      errors: err.errors.map(async error => `${error.path} ${await translateText(error.message)}`)
    })
  }

  return next(err)
}
