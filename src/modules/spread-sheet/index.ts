import axios from 'axios'
import papa from 'papaparse'

import { SpreadSheetSchema } from './validation'

import dotenv from 'dotenv'

import type { SpreadSheet } from './types'
import { hotmartFormattedRows } from './shared/hotmartFormattedRows'

dotenv.config()

export const spreadSheed = async (data: SpreadSheet) => {
  const { dataUrl, userId, platform, projectId } = SpreadSheetSchema.parse(data)

  console.log({
    dataUrl,
    userId,
    platform,
    projectId
  })

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

  const formattedRows = hotmartFormattedRows({ records, platform, user_id: userId, project_id: projectId })

  for (let count = 0; count < formattedRows.length; count += BATCH_SIZE) {
    const csvChunk = formattedRows.slice(count, count + BATCH_SIZE)

    console.log('Sending chunk', csvChunk.length, 'rows')

    /* 
    await axios.post(`${SUPABASE_URL}/functions/v1/postCSV`, csvChunk, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        Authorization: `Bearer ${API_KEY}`
      }
    }) 
    */
  }
}
