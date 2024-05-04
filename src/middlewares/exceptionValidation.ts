import type { ErrorRequestHandler } from 'express'

import { translateText } from '@/shared'

import { ZodError } from 'zod'

export const exceptionValidation: ErrorRequestHandler = async (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      errors: err.errors.map(async error => `${error.path} ${await translateText(error.message)}`)
    })
  }

  const error = async () => {
    if (typeof err.message === 'string') {
      return [await translateText(err.message)]
    }

    if (err.message instanceof Array) {
      return err.message.map(async (error: string) => await translateText(error))
    }

    if (err.message instanceof Object) {
      return Object.values(err.message).map(async (error: any) => await translateText(error))
    }

    return [translateText('An error occurred')]
  }

  return res.status(500).json({
    errors: await error()
  })
}
