import axios from 'axios'
import papa from 'papaparse'
import { getFormatedValue } from '@/shared'
import type { SurveyTypes } from './validation/surveySheetSchema'
import type { RowData } from './types'
import { randomUUID } from 'node:crypto'

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
  const BATCH_SIZE = 100
  const SUPABASE_URL = 'https://ogpwqkqsulbouecrnqlh.supabase.co/functions/v1/postResponses'

  console.log('Parsing CSV data...')
  const records = papa.parse<{ [key: string]: string }>(csvText, {
    header: true,
    skipEmptyLines: true
  })

  console.log('Mapping and formatting survey response rows...')
  const surveyResponsesRows = records.data
    .map(row => {
      const formattedRow: Omit<RowData, 'question' | 'answer' | 'is_multiplechoice' | 'id'> = {
        survey_id: surveyId,
        user_id: userId,
        project_id: projectId,
        response_date: getFormatedValue({ isFormattedDate: true, value: row[dateMask] }),
        email: row[emailMask]?.trim(), // Trim whitespace and handle undefined
        phone: row[phoneMask]?.trim() || null, // Trim whitespace and handle undefined
        name: row[nameMask]?.trim() || null, // Trim whitespace and handle undefined
        type
      }

      return Object.entries(row)
        .filter(([header]) => ![dateMask, emailMask, phoneMask, nameMask].includes(header))
        .map(([question, answer]) => ({
          ...formattedRow,
          id: randomUUID(),
          question,
          answer: answer?.trim() || '', // Trim whitespace and handle undefined
          is_multiplechoice: false
        }))
    })
    .flat()

  console.log('Data prepared for submission:', surveyResponsesRows)

  // Processamento dos chunks
  let currentBatch = []
  for (const [index, response] of surveyResponsesRows.entries()) {
    currentBatch.push(response)

    // Verifica se o batch está completo ou se é o último item
    if (currentBatch.length === BATCH_SIZE || index === surveyResponsesRows.length - 1) {
      console.log(`Sending chunk ${index / BATCH_SIZE + 1}:`, currentBatch)
      await postSurveyResponses<Array<RowData>>({ supabaseURL: SUPABASE_URL, data: currentBatch })
      currentBatch = [] // Reseta o batch
    }
  }
}

async function postSurveyResponses<T>({ supabaseURL, data }: { supabaseURL: string; data: T }): Promise<void> {
  try {
    console.log(`Enviando ${data.length} registros para ${supabaseURL}...`)
    console.log('Enviando:', data)

    const response = await axios.post(supabaseURL, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate'
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