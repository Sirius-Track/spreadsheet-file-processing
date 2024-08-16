import papa from 'papaparse'
import { getFormatedValue } from '@/shared'
import type { SurveyTypes } from './validation/surveySheetSchema'
import type { RowData } from './types'
import { randomUUID } from 'node:crypto'
import { clickhouseClient } from './configClickhouse'
import { setMultipleChoiceQuestions } from './setMultipleChoiceQuestions'

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
  const BATCH_SIZE = 5000

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
      console.log(`Sending chunk ${Math.ceil((index + 1) / BATCH_SIZE)}...`)
      await postSurveyResponsesToClickHouse(currentBatch)
      currentBatch = [] // Reseta o batch
    }
  }

  // Chama a função para setar as perguntas de múltipla escolha
  await setMultipleChoiceQuestions(surveyId)
}

async function postSurveyResponsesToClickHouse(data: Array<RowData>): Promise<void> {
  try {
    console.log(`Inserting ${data.length} records into ClickHouse...`)
    await clickhouseClient.insert({
      table: 'sirius_ltv.survey_responses',
      values: data,
      format: 'JSONEachRow'
    })
    console.log('Data successfully inserted into ClickHouse.')
  } catch (error: any) {
    console.error('Error inserting data into ClickHouse:', error.message)
    throw new Error(`Failed to insert data into ClickHouse: ${error.message}`)
  }
}
