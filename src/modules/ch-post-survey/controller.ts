import { surveySheet } from '.'
import type { RequestHandler } from 'express'

export const chPostSurvey: RequestHandler = async (req, res) => {
  console.log(req.body)

  try {
    // Validar e responder antes de processar
    await surveySheet(req.body, res)
  } catch (erro: any) {
    res.status(400).send({
      message: erro.message || 'Erro ao processar o arquivo de pesquisa'
    })
  }
}
