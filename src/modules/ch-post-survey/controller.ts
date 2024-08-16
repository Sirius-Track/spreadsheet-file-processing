import { surveySheet } from '.'
import type { RequestHandler } from 'express'

export const chPostSurvey: RequestHandler = async (req, res) => {
  console.log(req.body)

  try {
    // Validar e responder antes de processar
    await surveySheet(req.body, res)

    // Responde ao frontend antes de iniciar o processamento em segundo plano
    res.status(200).send({
      message: 'CSV validado com sucesso, o processamento será feito em segundo plano.'
    })
  } catch (erro: any) {
    res.status(400).send({
      message: erro.message || 'Erro ao processar o arquivo de pesquisa'
    })
  }
}
