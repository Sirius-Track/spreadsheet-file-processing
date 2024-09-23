import { clickhouseClient } from './configClickhouse'

type Response = Array<{
  question: string
  normalized_answer: string
}>

export async function setMultipleChoiceQuestions(surveyId: string): Promise<{ message: string; questions: string[] }> {
  try {
    console.log(`Buscando respostas para survey_id: ${surveyId}...`)

    // Buscar todas as respostas relacionadas ao survey_id
    const query = `
      SELECT question, lower(trim(answer)) AS normalized_answer
      FROM sirius_ltv.survey_responses
      WHERE survey_id = {surveyId: String}
    `
    const responses = await clickhouseClient.query({
      query,
      query_params: { surveyId },
      format: 'JSONEachRow'
    })

    const data: Response = await responses.json()

    if (data.length === 0) {
      console.log('Nenhuma resposta encontrada para o survey_id fornecido.')
      return {
        message: 'Nenhuma resposta encontrada para o survey_id fornecido.',
        questions: []
      }
    }

    // Agrupar respostas por pergunta
    const groupedResponses: { [question: string]: string[] } = {}
    for (const response of data) {
      const { question, normalized_answer } = response

      if (!groupedResponses[question]) {
        groupedResponses[question] = []
      }
      groupedResponses[question].push(normalized_answer)
    }

    const multipleChoiceQuestions: string[] = []
    for (const question in groupedResponses) {
      const answers = groupedResponses[question]
      const totalResponses = answers.length

      // Contagem das respostas
      const answerCounts: { [answer: string]: number } = {}
      for (const answer of answers) {
        if (!answerCounts[answer]) {
          answerCounts[answer] = 0
        }
        answerCounts[answer]++
      }

      // Filtrar respostas que representam pelo menos 10% do total
      const threshold = 0.1 * totalResponses
      const frequentAnswersSum = Object.values(answerCounts)
        .filter(count => count >= threshold)
        .reduce((sum, count) => sum + count, 0)

      // Verificar se a soma das frequentes é >= 90% do total
      if (frequentAnswersSum / totalResponses >= 0.9) {
        multipleChoiceQuestions.push(question)
      }
    }

    if (multipleChoiceQuestions.length === 0) {
      console.log('Nenhuma pergunta de múltipla escolha identificada.')
      return {
        message: 'Nenhuma pergunta de múltipla escolha identificada.',
        questions: []
      }
    }

    console.log(`Perguntas de múltipla escolha identificadas: ${multipleChoiceQuestions.join(', ')}`)

    // Atualizar is_multiplechoice para true nas perguntas identificadas
    await clickhouseClient.query({
      query: `
        ALTER TABLE sirius_ltv.survey_responses
        UPDATE is_multiplechoice = 1
        WHERE survey_id = {surveyId: String}
        AND question IN ({questions:Array(String)})
      `,
      query_params: {
        surveyId,
        questions: multipleChoiceQuestions
      },
      format: 'JSONEachRow'
    })

    console.log('Perguntas de múltipla escolha atualizadas com sucesso.')
    return {
      message: 'Perguntas de múltipla escolha identificadas e atualizadas com sucesso.',
      questions: multipleChoiceQuestions
    }
  } catch (error: any) {
    console.error('Erro ao processar a solicitação:', error.message)
    throw new Error(`Falha ao identificar ou atualizar perguntas de múltipla escolha: ${error.message}`)
  }
}
