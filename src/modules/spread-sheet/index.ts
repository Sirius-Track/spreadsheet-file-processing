import Papa from 'papaparse'

import axios from 'axios'

import dayjs from 'dayjs'

import { SpreadSheetSchema } from './validation'
import { headersFromCSV } from './headersFromCSV'

import type { SpreadSheet } from './types'

type RowData = {
  [key: string]: string
  user_id: string
  project_id: string
}

export const spreadSheed = async (data: SpreadSheet) => {
  const { dataUrl, userId, plataform, projectId } = SpreadSheetSchema.parse(data)

  const BATCH_SIZE = 2000
  const SUPABASE_URL = process.env.SUPABASE_URL
  const API_KEY = `Bearer ${process.env.API_KEY}`

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

  const formattedRow: RowData = {
    plataform,
    user_id: userId,
    project_id: projectId
  }

  const formattedRows: Array<RowData> = records.data.map(row => {
    for (const [header, value] of Object.entries({ ...row, ...formattedRow })) {
      const mappedHeader = headersFromCSV[header]

      const isFormatted = mappedHeader && ['transaction_date'].includes(mappedHeader.toLowerCase())

      const formattedValue = isFormatted ? dayjs(value).format('YYYY-MM-DD') : value.trim()

      if (mappedHeader) {
        formattedRow[mappedHeader] = formattedValue
      }
    }

    return formattedRow
  })

  console.log(formattedRows[0])

  // Divida os registros em partes de tamanho fixo de 2mil e envie-os para a rota 'postCSV' do Supabase
  for (let i = 0; i < 5; i += BATCH_SIZE) {
    const csvChunk = formattedRows.slice(i, i + BATCH_SIZE)

    // chuck de envio
    await axios
      .post(`${SUPABASE_URL}/rest/v1/postCSV`, csvChunk, {
        headers: { 'Content-Type': 'text/csv', apikey: API_KEY }
      })
      .catch(error => {
        console.log('erro')
        console.error(error)

        return new Error(error)
      })
  }
}
