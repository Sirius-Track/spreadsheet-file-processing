import type { ErrorRequestHandler } from 'express'

import { translateText } from '@/shared'

import { ZodError } from 'zod'

export const exceptionValidation: ErrorRequestHandler = async (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: `${err.errors[0].path} ${await translateText(err.errors[0].message)}`
    })
  }

  return next(err)
}
