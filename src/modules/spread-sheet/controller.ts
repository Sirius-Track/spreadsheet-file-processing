import { spreadSheed } from '.'

import type { RequestHandler } from 'express'

export const createspreadSheed: RequestHandler = (req, res) => {
  spreadSheed(req.body)

  res.status(201).send({
    message: 'Seu arquivo está sendo processado com sucesso'
  })
}
