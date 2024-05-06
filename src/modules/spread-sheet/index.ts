import axios from 'axios'
import papa from 'papaparse'

import { SpreadSheetSchema } from './validation'

import dotenv from 'dotenv'

import { hotmartFormattedRows } from './shared/hotmartFormattedRows'
import { perfectPay } from './shared/outherPlatform'

import type { SpreadSheet } from './types'

dotenv.config()

export const spreadSheed = async (data: SpreadSheet) => {
  const { dataUrl, userId, platform, projectId } = SpreadSheetSchema.parse(data)

  console.log({
    dataUrl,
    userId,
    platform,
    projectId
  })

  const fileCSV = await fetch(dataUrl)

  if (!fileCSV.ok) {
    throw new Error('File not found')
  }

  const csvText = await fileCSV.text()

  if (!csvText) {
    throw new Error('File is empty')
  }

  processCsvInBackground({ dataUrl, userId, platform, projectId, csvText })
}

type Props = SpreadSheet & {
  csvText: string
}

const processCsvInBackground = async ({ dataUrl, userId, platform, projectId, csvText }: Props) => {
  const BATCH_SIZE = 500
  const SUPABASE_URL = process.env.SUPABASE_URL
  const API_KEY = process.env.API_KEY

  const records = papa.parse<{ [key: string]: string }>(csvText, {
    header: true,
    skipEmptyLines: true
  })

  const formattedHotmartRows = {
    hotmart: hotmartFormattedRows({ records, platform, user_id: userId, project_id: projectId }),
    perfectpay: perfectPay({ records, platform, user_id: userId, project_id: projectId }),
    kiwify: [],
    eduzz: [],
    greenn: [],
    tmb: [],
    hubla: [],
    guru: [],
    ticto: []
  }[platform]

  for (let count = 0; count < formattedHotmartRows.length; count += BATCH_SIZE) {
    const csvChunk = formattedHotmartRows.slice(count, count + BATCH_SIZE)

    await axios.post(`${SUPABASE_URL}/functions/v1/postCSV`, csvChunk, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        Authorization: `Bearer ${API_KEY}`
      }
    })
  }
}
