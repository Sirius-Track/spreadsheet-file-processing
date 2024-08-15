import { surveySheet } from '.'
import type { RequestHandler } from 'express'

export const postSurvey: RequestHandler = async (req, res) => {
  console.log(req.body)

  await surveySheet(req.body)

  res.status(201).send({
    message: 'Seu arquivo de pesquisa está sendo processado com sucesso'
  })
}
