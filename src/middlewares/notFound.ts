import type { RequestHandler } from 'express'

import { HTTPError } from '@/errors'

export const notFound: RequestHandler = (req, res, next) => {
  if (req.path === '/') return res.redirect('/api-docs')

  next(new HTTPError('Resource not found', 404))
}
