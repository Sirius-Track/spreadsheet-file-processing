import { spreadSheed } from '.'

import type { RequestHandler } from 'express'

export const createspreadSheed: RequestHandler = async (req, res) => {
  console.log({ req })

  await spreadSheed(req?.file?.path as string)

  res.status(201).send()
}
