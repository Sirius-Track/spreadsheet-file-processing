import { spreadSheed } from '.'

import type { RequestHandler } from 'express'

export const syncActiveCampaign: RequestHandler = async (req, res) => {
  await spreadSheed(req.body)

  res.status(201).send({
    message: 'Seu arquivo está sendo processado com sucesso'
  })
}
