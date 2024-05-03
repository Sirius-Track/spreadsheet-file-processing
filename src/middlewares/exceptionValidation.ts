import type { ErrorRequestHandler } from 'express'

import { ZodError } from 'zod'

const addLogInDatabase = async (log: { message: string; statusCode: number; url: string; requestMethod: string }) => {
  //console.log(log)
}

export const exceptionValidation: ErrorRequestHandler = async (err, req, res, next) => {
  if (err instanceof ZodError) {
    await addLogInDatabase({
      message: err.errors.join('\n'),
      statusCode: 400,
      url: req.url,
      requestMethod: req.method
    })

    return res.status(400).json({
      errors: err.errors.map(error => `${error.path} ${error.message}`)
    })
  }

  return next(err)
}
