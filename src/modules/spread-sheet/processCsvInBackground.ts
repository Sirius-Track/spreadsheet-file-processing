import axios from 'axios'
import papa from 'papaparse'

import { formattingPlatformType } from './shared'

import { SpreadSheet } from './types'

type Props = Omit<SpreadSheet, 'dataUrl'> & {
  csvText: string
}

export const processCsvInBackground = async ({ userId, platform, projectId, csvText }: Props) => {
  const BATCH_SIZE = 500
  const SUPABASE_URL = process.env.SUPABASE_URL
  const API_KEY = process.env.API_KEY

  const records = papa.parse<{ [key: string]: string }>(csvText, {
    header: true,
    skipEmptyLines: true
  })

  const remainderHeaderValues = {
    records,
    platform,
    userId,
    projectId
  }

  const platformsRows = formattingPlatformType({ remainderHeaderValues })

  for (let count = 0; count < platformsRows.length; count += BATCH_SIZE) {
    const csvChunk = platformsRows.slice(count, count + BATCH_SIZE)

    await axios.post(`${SUPABASE_URL}/functions/v1/postCSV`, csvChunk, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        Authorization: `Bearer ${API_KEY}`
      }
    })
  }
}
