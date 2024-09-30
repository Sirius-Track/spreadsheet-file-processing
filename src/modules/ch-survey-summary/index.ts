import { clickhouseClient } from './configClickhouse'
import type { RowData } from './types'
import { sendAnalysisToChatGPT } from './sendToChatGPT'
import { scoreSchemaChatGPT } from './scoreSchemaChatGPT'

type analyzeBody = {
  question_id: string
  question_text: string
  answer_text: string
  lead_percentage?: string
  buyer_percentage?: string
  note: string
  lead_response_count?: string
  buyer_response_count?: string
}

export const generateSurveyReport = async ({
  projectId,
  userId,
  prodDescription,
  prodPriceRange,
  prodTargetAudience,
  prodName
}: {
  projectId: string
  userId: string
  prodDescription: string
  prodPriceRange: string
  prodTargetAudience: string
  prodName: string
}) => {
  console.log('Buscando respostas para o projeto e usuário especificados...')

  // Consulta para obter todas as respostas para o projeto e usuário especificados
  const query = `
    SELECT *
    FROM sirius_ltv.survey_responses
    WHERE project_id = {projectId: String}
      AND user_id = {userId: String}
      AND is_multiplechoice = 1
  `

  const result = await clickhouseClient.query({
    query,
    query_params: { projectId, userId },
    format: 'JSONEachRow'
  })

  const data: RowData[] = await result.json()

  if (!data || data.length === 0) {
    throw new Error('Nenhuma resposta encontrada para este projeto e usuário.')
  }

  // Processar as respostas para construir o JSON final
  const surveys = {
    lead: { total_responses: 0, questions: [] as any[] },
    buyer: { total_responses: 0, questions: [] as any[] }
  }

  // Segregar respostas de leads e buyers, e calcular totais e percentuais
  const leadResponses = data.filter(item => item.type === 'lead')
  const buyerResponses = data.filter(item => item.type === 'buyer')

  // Processamento das perguntas e respostas para leads
  processSurveyResponses(leadResponses, surveys.lead)
  // Processamento das perguntas e respostas para buyers
  processSurveyResponses(buyerResponses, surveys.buyer)

  // Análise de convergências, divergências e outliers
  const analysis = analyzeData(surveys.lead, surveys.buyer)
  sendAnalysisToChatGPT(analysis, prodPriceRange)
    .then(chatGPTResponse => {
      //console.log('Resposta do ChatGPT:', chatGPTResponse)
      // scoreSchemaChatGPT(chatGPTResponse, projectId, userId)
      //   .then(chatGPTSchema => {
      //     console.log('Schema do ChatGPT:', chatGPTSchema)
      //   })
      //   .catch(error => {
      //     console.error('Erro ao processar a análise com ChatGPT:', error)
      //   })
    })
    .catch(error => {
      console.error('Erro ao processar a análise com ChatGPT:', error)
    })
  const jsonResponse = {
    project_id: projectId,
    user_id: userId,
    productInfo: {
      name: prodName,
      description: prodDescription,
      price_range: prodPriceRange,
      target_audience: prodTargetAudience
    },
    surveys,
    analysis
  }
  console.log('JSON Final gerado:', jsonResponse)
  return jsonResponse
}

function processSurveyResponses(responses: RowData[], survey: any) {
  console.log('Entramos em processSurveyResponses')
  const questionsMap = new Map()

  responses.forEach(response => {
    let question = questionsMap.get(response.question)
    if (!question) {
      question = {
        question_id: generateQuestionId(response.question),
        question_text: response.question,
        category: categorizeQuestion(response.question),
        total_responses: 0,
        answers: []
      }
      questionsMap.set(response.question, question)
      survey.questions.push(question)
    }

    question.total_responses += 1
    survey.total_responses += 1

    const answer = question.answers.find((a: any) => a.answer_text === response.answer)
    if (answer) {
      answer.response_count += 1
    } else {
      question.answers.push({
        answer_text: response.answer,
        response_count: 1,
        response_percentage: 0 // Placeholder, será calculado depois
      })
    }
  })

  // Calcular percentuais
  survey.questions.forEach((question: any) => {
    question.answers.forEach((answer: any) => {
      answer.response_percentage = parseFloat(((answer.response_count / question.total_responses) * 100).toFixed(1))
    })
  })
}

function categorizeQuestion(questionText: string) {
  // Aqui você pode usar lógica mais sofisticada para categorizar as perguntas, se necessário
  return questionText.toLowerCase().includes('objetivo') ? 'qualificadora' : 'interesse'
}

function analyzeData(leadSurvey: any, buyerSurvey: any) {
  console.log('Entramos em analyzeData')

  const totalLeadResponses = leadSurvey.total_responses
  const totalBuyerResponses = buyerSurvey.total_responses

  // Calcula a proporção de leads para buyers
  const leadToBuyerRatio = totalLeadResponses / totalBuyerResponses

  // Função auxiliar para normalizar percentuais com base na ponderação de amostras
  const normalizePercentage = (buyerPercentage: number) => {
    return buyerPercentage * leadToBuyerRatio
  }

  const analysis: {
    questions: {
      question_id: string
      question_text: string
      category: string
      total_lead_responses: number
      total_buyer_responses: number
      answers: {
        answer_text: string
        lead_response_count: number
        lead_response_percentage: number
        buyer_response_count: number
        buyer_response_percentage: number
      }[]
    }[]
  } = { questions: [] }

  leadSurvey.questions.forEach((leadQuestion: any) => {
    const buyerQuestion = buyerSurvey.questions.find((q: any) => q.question_text === leadQuestion.question_text)

    if (buyerQuestion) {
      const questionAnalysis = {
        question_id: leadQuestion.question_id,
        question_text: leadQuestion.question_text,
        category: '', // Categoria vazia para ser preenchida pela IA
        total_lead_responses: leadQuestion.total_responses,
        total_buyer_responses: buyerQuestion.total_responses,
        answers: [] as any[] // Armazenar as respostas individualmente
      }

      leadQuestion.answers.forEach((leadAnswer: any) => {
        const buyerAnswer = buyerQuestion.answers.find((a: any) => a.answer_text === leadAnswer.answer_text)

        if (buyerAnswer) {
          const leadPercentage = leadAnswer.response_percentage
          const buyerPercentage = normalizePercentage(buyerAnswer.response_percentage)

          // Adicionar as respostas, mantendo os percentuais de leads e buyers separados
          questionAnalysis.answers.push({
            answer_text: leadAnswer.answer_text,
            lead_response_count: leadAnswer.response_count,
            lead_response_percentage: leadPercentage,
            buyer_response_count: buyerAnswer.response_count,
            buyer_response_percentage: buyerPercentage / leadToBuyerRatio // Ajustado para mostrar o valor real
          })
        }
      })

      analysis.questions.push(questionAnalysis)
    }
  })

  console.log('Análise gerada:', analysis)

  return analysis
}

function generateQuestionId(questionText: string) {
  return 'q' + questionText.slice(0, 5) + Math.floor(Math.random() * 1000)
}
