import { SurveyTypes, SurveySheetSchema } from './validation/surveySheetSchema'
import { processSurveyResponsesBackground } from './processSurveyResponsesBackground'

export const surveySheet = async (data: SurveyTypes) => {
  const { dataUrl, userId, projectId, surveyName, type, dateMask, emailMask, phoneMask, nameMask } =
    SurveySheetSchema.parse(data)

  const fileCSV = await fetch(dataUrl)

  if (!fileCSV.ok) {
    throw new Error('File not found')
  }

  const csvText = await fileCSV.text()

  if (!csvText) {
    throw new Error('File is empty')
  }

  const surveyId = await createOrGetSurveyId({ userId, projectId, surveyName, type })

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
}) => {
  const response = await fetch('https://sssv.com/postSurvey', {
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
