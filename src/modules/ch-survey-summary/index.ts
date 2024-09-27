import { clickhouseClient } from './configClickhouse'
import type { RowData } from './types'

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

  const analysis: {
    convergences: analyzeBody[]
    divergences: analyzeBody[]
    outliers: analyzeBody[]
  } = { convergences: [], divergences: [], outliers: [] }

  leadSurvey.questions.forEach((leadQuestion: any) => {
    const buyerQuestion = buyerSurvey.questions.find((q: any) => q.question_text === leadQuestion.question_text)

    if (buyerQuestion) {
      leadQuestion.answers.forEach((leadAnswer: any) => {
        const buyerAnswer = buyerQuestion.answers.find((a: any) => a.answer_text === leadAnswer.answer_text)

        if (buyerAnswer) {
          // Calcula o percentual normalizado para buyers com base na proporção de leads para buyers
          const leadPercentage = leadAnswer.response_percentage
          const buyerPercentage = buyerAnswer.response_percentage * leadToBuyerRatio

          // Calcula a diferença percentual ajustada
          const percentageDifference = Math.abs(leadPercentage - buyerPercentage)

          // Calcule o desvio padrão para detectar outliers
          const meanPercentage = (leadPercentage + buyerPercentage) / 2
          const stdDev = Math.sqrt(
            (Math.pow(leadPercentage - meanPercentage, 2) + Math.pow(buyerPercentage - meanPercentage, 2)) / 2
          )

          // Detectando convergência (menor variação após normalização)
          if (percentageDifference < 9) {
            analysis.convergences.push({
              question_id: leadQuestion.question_id,
              question_text: leadQuestion.question_text,
              answer_text: leadAnswer.answer_text,
              lead_percentage: leadPercentage,
              buyer_percentage: buyerPercentage / leadToBuyerRatio, // Ajustado para exibir o valor real
              note: 'Resposta comum com pequena variação.'
            })
          }

          // Detectando divergência
          else if (percentageDifference >= 9 && percentageDifference < stdDev * 2) {
            analysis.divergences.push({
              question_id: leadQuestion.question_id,
              question_text: leadQuestion.question_text,
              answer_text: leadAnswer.answer_text,
              lead_percentage: leadPercentage,
              buyer_percentage: buyerPercentage / leadToBuyerRatio, // Ajustado para exibir o valor real
              note: 'Grande divergência entre leads e buyers.'
            })
          }

          // Detectando outliers (respostas muito distantes da média)
          else if (percentageDifference >= stdDev * 2) {
            analysis.outliers.push({
              question_id: leadQuestion.question_id,
              question_text: leadQuestion.question_text,
              answer_text: leadAnswer.answer_text,
              lead_response_count: leadAnswer.response_count,
              buyer_response_count: buyerAnswer.response_count,
              note: 'Alta discrepância, resposta fora do padrão.'
            })
          }
        }
      })
    }
  })

  console.log('Análise gerada:', analysis)
  return analysis
}

function generateQuestionId(questionText: string) {
  return 'q' + questionText.slice(0, 5) + Math.floor(Math.random() * 1000)
}
