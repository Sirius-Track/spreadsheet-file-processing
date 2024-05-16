import { ZodError } from 'zod'
import { AxiosError } from 'axios'

import { translateText } from '@/shared'

import type { ErrorRequestHandler } from 'express'

const error = async (err: any) => {
  if (typeof err.message === 'string') {
    return [await translateText(err.message)]
  }

  if (err.message instanceof Array) {
    const erros = Object.values(err.message.map((error: string) => translateText(error)))

    return await Promise.all(erros)
  }

  if (err.message instanceof Object) {
    const erros = Object.values(err.message).map((error: any) => translateText(error))

    return await Promise.all(erros)
  }

  return err
}

export const exceptionValidation: ErrorRequestHandler = async (err, req, res, next) => {
  if (err instanceof ZodError) {
    const message = err.errors.map(error => `${error.path} ${error.message}`)

    return res.status(400).json({
      errors: await error({ message })
    })
  }

  if (err instanceof AxiosError) {
    return res.status(err.response?.status || 500).json({
      errors: await error(err.response?.data)
    })
  }

  return res.status(500).json({
    errors: await error(err)
  })
}
