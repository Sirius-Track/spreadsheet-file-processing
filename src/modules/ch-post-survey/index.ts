import { SurveyTypes, SurveySheetSchema } from './validation/surveySheetSchema'
import { processSurveyResponsesBackground } from './processSurveyResponsesBackground'
import papa from 'papaparse'
import { clickhouseClient } from './configClickhouse'

type HeadersCsv = string[] | undefined

export const surveySheet = async (data: SurveyTypes, res: any) => {
  const { dataUrl, userId, projectId, surveyName, type, dateMask, emailMask, phoneMask, nameMask } =
    SurveySheetSchema.parse(data)

  // Fetch do CSV
  const fileCSV = await fetch(dataUrl)

  if (!fileCSV.ok) {
    throw new Error('File not found')
  }

  const csvText = await fileCSV.text()

  if (!csvText) {
    throw new Error('File is empty')
  }

  // Validação do CSV
  const records = papa.parse(csvText, { header: true, skipEmptyLines: true })

  if (records.errors.length > 0) {
    throw new Error('CSV inválido.')
  }

  const headers: HeadersCsv = records.meta.fields
  if (!headers?.includes(emailMask) || !headers?.includes(dateMask)) {
    throw new Error(`O CSV deve conter as colunas "${emailMask}" e "${dateMask}".`)
  }

  // Criação ou recuperação do ID da pesquisa
  const surveyId = await createOrGetSurveyId({ userId, projectId, surveyName, type })

  // Inicia o processamento em segundo plano
  await startBackgroundProcess(
    userId,
    projectId,
    surveyName,
    type,
    dataUrl,
    csvText,
    dateMask,
    emailMask,
    phoneMask,
    nameMask,
    surveyId
  )

  // Responde ao frontend
  res.status(200).send({
    message: 'CSV validado com sucesso, o processamento será feito em segundo plano.'
  })
}

const createOrGetSurveyId = async ({
  userId,
  projectId,
  surveyName,
  type
}: {
  userId: string
  projectId: string
  surveyName: string
  type: string
}): Promise<string> => {
  // Verifica se já existe uma survey com o mesmo nome para o mesmo userId e projectId
  const query = `
    SELECT id 
    FROM sirius_ltv.surveys 
    WHERE survey_name = {surveyName: String} 
      AND user_id = {userId: String} 
      AND project_id = {projectId: String} 
      AND type = {type: String}
    LIMIT 1
  `

  const existingSurveys = await clickhouseClient.query({
    query,
    query_params: {
      surveyName,
      userId,
      projectId,
      type
    },
    format: 'JSONEachRow'
  })

  const survey: any = await existingSurveys.json()

  if (survey.length > 0) {
    console.log('Pesquisa já existente encontrada, retornando surveyId...')
    return survey[0].id
  }

  // Se a pesquisa não existe, cria uma nova
  console.log('Criando nova pesquisa...')
  const surveyId = crypto.randomUUID()
  const createdAt = new Date().toISOString()

  await clickhouseClient.insert({
    table: 'sirius_ltv.surveys',
    values: [
      {
        id: surveyId,
        survey_name: surveyName,
        first_response_date: null, // ou null se desejar omitir
        created_at: createdAt,
        user_id: userId,
        project_id: projectId,
        type: type
      }
    ],
    format: 'JSONEachRow'
  })

  console.log('Nova pesquisa criada com sucesso, retornando surveyId...')
  return surveyId
}

async function startBackgroundProcess(
  userId: string,
  projectId: string,
  surveyName: string,
  type: 'lead' | 'buyer',
  dataUrl: string,
  csvText: string,
  dateMask: string,
  emailMask: string,
  phoneMask: string,
  nameMask: string,
  surveyId: string
) {
  // Processamento em segundo plano
  await processSurveyResponsesBackground({
    surveyName,
    surveyId,
    dataUrl,
    userId,
    projectId,
    csvText,
    dateMask,
    emailMask,
    phoneMask,
    nameMask,
    type
  })
}
