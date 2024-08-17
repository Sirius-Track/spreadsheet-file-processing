import { clickhouseClient } from './configClickhouse'
import type { RowData } from './types'

type analyzeBody = {
  question_id: string
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

  return jsonResponse
}

function processSurveyResponses(responses: RowData[], survey: any) {
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
          const leadPercentage = leadAnswer.response_percentage
          const buyerPercentage = buyerAnswer.response_percentage

          if (Math.abs(leadPercentage - buyerPercentage) < 10) {
            analysis.convergences.push({
              question_id: leadQuestion.question_id,
              answer_text: leadAnswer.answer_text,
              lead_percentage: leadPercentage,
              buyer_percentage: buyerPercentage,
              note: 'Resposta comum, mas com variação significativa de porcentagem.'
            })
          } else {
            analysis.divergences.push({
              question_id: leadQuestion.question_id,
              answer_text: leadAnswer.answer_text,
              lead_percentage: leadPercentage,
              buyer_percentage: buyerPercentage,
              note: 'Grande divergência entre leads e buyers, deve ser considerada na desqualificação de leads.'
            })
          }

          // Calcule o total de respostas para a pergunta
          const totalResponses = leadAnswer.response_count + buyerAnswer.response_count

          // Defina o limite como 10% do total de respostas
          const outlierThreshold = totalResponses * 0.1

          // Exemplo de detecção de outliers com limite dinâmico
          if (Math.abs(leadAnswer.response_count - buyerAnswer.response_count) > outlierThreshold) {
            analysis.outliers.push({
              question_id: leadQuestion.question_id,
              answer_text: leadAnswer.answer_text,
              lead_response_count: leadAnswer.response_count,
              buyer_response_count: buyerAnswer.response_count,
              note: 'Alta discrepância em relação a outras respostas, possivelmente muito influenciada por fatores externos.'
            })
          }
        }
      })
    }
  })

  return analysis
}

function generateQuestionId(questionText: string) {
  return 'q' + questionText.slice(0, 5) + Math.floor(Math.random() * 1000)
}
