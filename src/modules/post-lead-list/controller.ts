import { spreadSheed } from '.'

import type { RequestHandler } from 'express'

export const createsPostLeadList: RequestHandler = async (req, res) => {
  console.log(req.body)

  await spreadSheed(req.body)

  res.status(201).send({
    message: 'Seu arquivo está sendo processado com sucesso'
  })
}
