import Papa from 'papaparse'

import axios from 'axios'

import dayjs from 'dayjs'

import { SpreadSheetSchema } from './validation'

import type { SpreadSheet } from './types'

type RowData = {
  [key: string]: string
  user_id: string
  project_id: string
}

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

  const formattedRows: Array<RowData> = records.data.map(row => {
    const formattedRow: RowData = {
      user_id: '',
      project_id: ''
    }

    for (const [header, value] of Object.entries(row)) {
      const formattedValue = ['data da transação', 'confirmação do pagamento'].includes(header.toLowerCase())
        ? dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        : value.trim()

      formattedRow[header] = formattedValue
    }

    formattedRow['user_id'] = userId

    formattedRow['project_id'] = projectId

    return formattedRow
  })

  // Mantenha o cabeçalho para uso nas partes divididas
  const header = Object.keys(formattedRows[0])

  console.log(formattedRows[0])

  // Divida os registros em partes de tamanho fixo de 2mil e envie-os para a rota 'postCSV' do Supabase
  for (let i = 0; i < formattedRows.length; i += BATCH_SIZE) {
    const slice = formattedRows.slice(i, i + BATCH_SIZE)
    const csvChunk = JSON.stringify([header, ...slice.map(row => header.map(field => row[field]))])

    // chuck de envio
    await axios
      .post(`${SUPABASE_URL}/rest/v1/postCSV`, csvChunk, { headers: { 'Content-Type': 'text/csv' } })
      .catch(error => new Error(error))
  }
}
