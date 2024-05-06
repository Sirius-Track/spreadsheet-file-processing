import { spreadSheed } from '.'

import type { RequestHandler } from 'express'

export const createspreadSheed: RequestHandler = async (req, res) => {
  await spreadSheed(req.body)

  res.status(201).send({
    message: 'Your file is being processed successfully'
  })
}
