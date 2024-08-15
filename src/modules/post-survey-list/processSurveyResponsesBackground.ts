import axios from 'axios'
import papa from 'papaparse'
import { getFormatedValue } from '@/shared'
import { randomUUID } from 'crypto'
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
  const BATCH_SIZE = 5
  const SUPABASE_URL = 'https://ogpwqkqsulbouecrnqlh.supabase.co/functions/v1/postResponses'

  const records = papa.parse<{ [key: string]: string }>(csvText, {
    header: true,
    skipEmptyLines: true
  })

  const surveyResponsesRows = records.data
    .map(row => {
      const formattedRow: Omit<RowData, 'question' | 'answer' | 'is_multiplechoice'> = {
        id: randomUUID(), // Gera um UUID único para cada registro
        survey_id: surveyId,
        user_id: userId,
        project_id: projectId,
        response_date: getFormatedValue({ isFormattedDate: true, value: row[dateMask] }),
        email: row[emailMask]?.trim(), // Remove espaços extras
        phone: row[phoneMask] || null, // Substitui undefined por null
        name: row[nameMask] || null, // Substitui undefined por null
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

    await postSurveyResponses<Array<RowData>>({
      supabaseURL: SUPABASE_URL,
      data: csvChunk
    })
  }
}

async function postSurveyResponses<T>({ supabaseURL, data }: { supabaseURL: string; data: T }): Promise<void> {
  try {
    console.log(`Enviando ${data.length} registros para ${supabaseURL}...`)
    console.log('Enviando:', data)

    const response = await axios.post(supabaseURL, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status !== 200) {
      throw new Error(`Erro ao enviar dados: ${response.statusText}`)
    }

    console.log(`Dados enviados com sucesso para ${supabaseURL}.`)
  } catch (error) {
    console.error('Erro ao enviar dados para o Supabase:', error.message)
    throw new Error(`Falha ao enviar dados para ${supabaseURL}: ${error.message}`)
  }
}
