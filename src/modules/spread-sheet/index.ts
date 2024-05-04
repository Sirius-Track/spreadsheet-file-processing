import Papa from 'papaparse'

import { SpreadSheetSchema } from './validation'

import axios from 'axios'

import type { SpreadSheet } from './types'

export const spreadSheed = async (data: SpreadSheet) => {
  const { dataUrl, userId, projectId } = SpreadSheetSchema.parse(data)

  const BATCH_SIZE = 2000
  const SUPABASE_URL = process.env.SUPABASE_URL

  const fileCSV = await fetch(dataUrl)

  if (!fileCSV.ok) {
    throw new Error('File not found')
  }

  const csvText = await fileCSV.text()

  if (!csvText) {
    throw new Error('File is empty')
  }

  const records = Papa.parse<{ [key: string]: string }>(csvText, {
    header: true,
    skipEmptyLines: true
  })

  // Mantenha o cabeçalho para uso nas partes divididas
  const header = Object.keys(records.data[0])

  // Divida os registros em partes de tamanho fixo de 2mil e envie-os para a rota 'postCSV' do Supabase
  for (let i = 0; i < records.data.length; i += BATCH_SIZE) {
    const slice = records.data.slice(i, i + BATCH_SIZE)
    const csvChunk = JSON.stringify([header, ...slice.map(row => header.map(field => row[field]))])

    console.log(csvChunk)

    // chuck de envio
    await axios
      .post(`${SUPABASE_URL}/rest/v1/postCSV`, csvChunk, { headers: { 'Content-Type': 'text/csv' } })
      .catch(error => new Error(error))
  }
}
