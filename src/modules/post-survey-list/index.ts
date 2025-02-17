import { SurveyTypes, SurveySheetSchema } from './validation/surveySheetSchema'
import { processSurveyResponsesBackground } from './processSurveyResponsesBackground'
import papa from 'papaparse'

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
  startBackgroundProcess(
    userId,
    projectId,
    surveyName,
    type,
    dataUrl,
    csvText,
    dateMask,
    emailMask,
    phoneMask,
    nameMask
  )
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
  type: 'lead' | 'buyer'
}) => {
  const response = await fetch('https://ogpwqkqsulbouecrnqlh.supabase.co/functions/v1/postSurvey', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, projectId, surveyName, type })
  })

  const data = await response.json()

  if (!data || !data.surveyId) {
    throw new Error('Failed to create or retrieve survey ID')
  }

  return data.surveyId
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
  nameMask: string
) {
  const surveyId = await createOrGetSurveyId({ userId, projectId, surveyName, type })

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
