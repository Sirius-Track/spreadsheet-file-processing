import type { RequestHandler } from 'express'
import { generateSurveyReport } from './index'

export const surveySummary: RequestHandler = async (req, res) => {
  try {
    console.log('Recebendo e processando o request...')

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Método não permitido, use POST' })
    }

    const { projectId, userId, prodDescription, prodPriceRange, prodTargetAudience, prodName } = req.body

    if (!projectId || !userId) {
      return res.status(400).json({
        error: "Parâmetros 'projectId' e 'userId' são obrigatórios."
      })
    }

    const jsonResponse = await generateSurveyReport({
      projectId,
      userId,
      prodDescription,
      prodPriceRange,
      prodTargetAudience,
      prodName
    })

    res.status(200).json(jsonResponse)
  } catch (error: any) {
    console.error('Erro ao processar a solicitação:', error.message)
    res.status(500).json({ error: error.message })
  }
}
