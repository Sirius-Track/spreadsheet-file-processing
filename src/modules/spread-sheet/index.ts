import Papa from 'papaparse'

import type { SpreadSheet } from './types'

import { SpreadSheetSchema } from './validation/validation'

export const spreadSheed = async (data: SpreadSheet) => {
  const { dataUrl, userId, projectId, sendTo } = SpreadSheetSchema.parse(data)

  console.log({ dataUrl, userId, projectId, sendTo })
  console.log()

  const fileCSV = await fetch(dataUrl)

  if (!fileCSV.ok) {
    throw new Error('File not found')
  }

  const csvText = await fileCSV.text()

  if (!csvText) {
    throw new Error('File is empty')
  }

  /* const records = parse(csvText, {
    columns: true,
    skip_empty_lines: true
  }) */

  const records = Papa.parse(csvText, {
    header: true
  })

  console.log(records.data)

  // Mantenha o cabeçalho para uso nas partes divididas
  /* const header = Object.keys(records[0])

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const slice = records.slice(i, i + BATCH_SIZE)
    const csvChunk = stringify([header, ...slice.map(row => header.map(field => row[field]))])

    // Envie o chunk para a rota 'postCSV'
    await fetch('https://<your-supabase-url>/rest/v1/postCSV', {
      method: 'POST',
      headers: { 'Content-Type': 'text/csv' },
      body: csvChunk
    })
  } */
}
