import axios from 'axios'
import papa from 'papaparse'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { SpreadSheetSchema } from './validation'

import { headersHotmartFromCSV } from './headersFromCSV'

import dotenv from 'dotenv'

import type { SpreadSheet } from './types'

type RowData = {
  [key: string]: string
  user_id: string
  project_id: string
}

dotenv.config()

export const spreadSheed = async (data: SpreadSheet) => {
  const { dataUrl, userId, platform, projectId } = SpreadSheetSchema.parse(data)

  console.log({
    dataUrl,
    userId,
    platform,
    projectId
  })

  dayjs.extend(customParseFormat)

  const BATCH_SIZE = 500
  const SUPABASE_URL = process.env.SUPABASE_URL
  const API_KEY = process.env.API_KEY

  const fileCSV = await fetch(dataUrl)

  if (!fileCSV.ok) {
    throw new Error('File not found')
  }

  const csvText = await fileCSV.text()

  if (!csvText) {
    throw new Error('File is empty')
  }

  const records = papa.parse<{ [key: string]: string }>(csvText, {
    header: true,
    skipEmptyLines: true
  })

  const formattedRows: Array<RowData> = records.data.map(row => {
    const formattedRow: RowData = {
      platform,
      user_id: userId,
      project_id: projectId
    }

    for (const [header, value] of Object.entries({ ...row, ...formattedRow })) {
      const mappedHeader = headersHotmartFromCSV[header]

      const isFormatted = mappedHeader && ['transaction_date'].includes(mappedHeader.toLowerCase())

      if (mappedHeader) {
        formattedRow[mappedHeader] = getFormatedValue(isFormatted, value)
      }
    }

    return formattedRow
  })

  for (let count = 0; count < formattedRows.length; count += BATCH_SIZE) {
    const csvChunk = formattedRows.slice(count, count + BATCH_SIZE)

    console.log('Sending chunk', csvChunk.length, 'rows')

    await axios.post(`${SUPABASE_URL}/functions/v1/postCSV`, csvChunk, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        Authorization: `Bearer ${API_KEY}`
      }
    })
  }
}
function getFormatedValue(isFormatted: boolean, value: string) {
  if (isFormatted) {
    const dateFormated = dayjs(value, 'DD/MM/YYYY').format('YYYY-MM-DD')

    return dateFormated
  }

  return value.trim()
}
