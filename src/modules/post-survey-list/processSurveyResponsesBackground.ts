import axios from 'axios'
import papa from 'papaparse'
import { getFormatedValue } from '@/shared'
import type { SurveyTypes } from './validation/surveySheetSchema'
import type { RowData } from './types'

type Props = SurveyTypes & {
  surveyId: string
  csvText: string
}

export const processSurveyResponsesBackground = async ({
  surveyId,
  csvText,
  userId,
  projectId,
  dateMask,
  emailMask,
  phoneMask,
  nameMask,
  type
}: Props) => {
  const BATCH_SIZE = 500
  const SUPABASE_URL = 'https://sssv.com/postResponses' as string

  const records = papa.parse<{ [key: string]: string }>(csvText, {
    header: true,
    skipEmptyLines: true
  })

  const surveyResponsesRows = records.data
    .map(row => {
      const formattedRow: Omit<RowData, 'question' | 'answer' | 'is_multiplechoice'> = {
        survey_id: surveyId,
        user_id: userId,
        project_id: projectId,
        response_date: getFormatedValue({ isFormattedDate: true, value: row[dateMask] }),
        email: row[emailMask],
        phone: row[phoneMask],
        name: row[nameMask],
        type
      }

      const responses = Object.entries(row)
        .filter(([header]) => ![dateMask, emailMask, phoneMask, nameMask].includes(header))
        .map(([question, answer]) => ({
          ...formattedRow,
          question,
          answer,
          is_multiplechoice: false
        }))

      return responses
    })
    .flat()

  for (let count = 0; count < surveyResponsesRows.length; count += BATCH_SIZE) {
    const csvChunk = surveyResponsesRows.slice(count, count + BATCH_SIZE)

    await postSurveyResponses<Array<RowData>>({ supabaseURL: SUPABASE_URL, data: csvChunk })
  }

  // await axios.post(
  //   'https://siriusltv.com/api/1.1/wf/removefileafterupload/',
  //   { fileUrl: dataUrl },
  //   {
  //     headers: { 'Content-Type': 'application/json' }
  //   }
  // )
}
function postSurveyResponses<T>(arg0: {
  supabaseURL: string
  data: {
    question: string
    answer: string
    is_multiplechoice: boolean
    survey_id: string
    user_id: string
    project_id: string
    response_date: string
    email: string
    phone?: string
    name?: string
    type: string
  }[]
}) {
  throw new Error('Function not implemented.')
}
