import { surveySheet } from '.'
import { validateAndRespond, processSurveyResponsesBackground } from './surveyProcessor'
import type { RequestHandler } from 'express'

export const postSurvey: RequestHandler = async (req, res) => {
  const { surveyId, csvText, userId, projectId, dateMask, emailMask, phoneMask, nameMask, type } = req.body

  // Validação inicial
  try {
    if (!surveyId || !csvText || !userId || !projectId || !dateMask || !emailMask) {
      return res.status(400).json({ error: 'Dados obrigatórios ausentes no corpo da requisição.' })
    }

    // Valida e responde rapidamente
    const validationResponse = await validateAndRespond({ csvText, emailMask, dateMask })
    res.status(200).json(validationResponse)

    // Processa em segundo plano
    await processSurveyResponsesBackground({
      surveyId,
      csvText,
      userId,
      projectId,
      dateMask,
      emailMask,
      phoneMask,
      nameMask,
      type
    })

    console.log('Processamento em segundo plano iniciado para o CSV.')
  } catch (error) {
    console.error('Erro no processamento:', error)
    res.status(400).json({ error: error.message })
  }
}
