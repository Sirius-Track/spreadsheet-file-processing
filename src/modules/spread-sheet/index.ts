import Papa from 'papaparse'

import axios from 'axios'

import moment from 'moment'
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

  // Mantenha o cabeçalho para uso nas partes divididas
  const header = Object.keys(records.data[0])

  console.log(records.data[0])

  const timef = '02/09/2024 01:02:20'
  const par = moment(timef, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')

  console.log(par)

  /* const formattedRows: Array<RowData> = records.data.map(row => {
    const formattedRow: {
      [key: string]: string
      user_id: string
      project_id: string
    } = {
      user_id: '',
      project_id: ''
    }

    for (const [header, value] of Object.entries(row)) {
      console.log('-------')
      console.log(header.toLocaleLowerCase())
      console.log('=======')

      if (['data da transação', 'confirmação do pagamento'].includes(header.toLocaleLowerCase())) {
        'data da transação' === header.toLocaleLowerCase() && console.log('iquais')
        console.log(value)

        'confirmação do pagamento' === header.toLocaleLowerCase() && console.log('iquais')

        formattedRow[header] = moment(value, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
      } else {
        formattedRow[header] = moment(value, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss').trim()
      }
    }

    formattedRow['user_id'] = userId

    formattedRow['project_id'] = projectId

    return formattedRow
  })

  console.log(formattedRows[0]) */

  const database = 'sales_duplicate'

  // Divida os registros em partes de tamanho fixo de 2mil e envie-os para a rota 'postCSV' do Supabase
  for (let i = 0; i < records.data.length; i += BATCH_SIZE) {
    const slice = records.data.slice(i, i + BATCH_SIZE)
    const csvChunk = JSON.stringify([header, ...slice.map(row => header.map(field => row[field]))])

    // chuck de envio
    await axios
      .post(`${SUPABASE_URL}/rest/v1/postCSV`, csvChunk, { headers: { 'Content-Type': 'text/csv' } })
      .catch(error => new Error(error))
  }
}
