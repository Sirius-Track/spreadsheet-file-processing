import axios from 'axios'
import papa from 'papaparse'

import { headerTreatment } from './shared/headerTreatment'

import { SpreadSheet } from './types'
import { perfectpayHeader, perfectPayMissing, eduzzHeader, eduzzMissing } from './shared'

import type { EduzzHeaderValues, PerfectpayHeaderValues } from './shared'

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

  const formattedHotmartRows = {
    hotmart: [],
    perfectpay: headerTreatment<typeof perfectpayHeader, PerfectpayHeaderValues>({
      headerMissing: perfectPayMissing,
      platformHeader: perfectpayHeader,
      ...remainderHeaderValues
    }),
    kiwify: [],
    eduzz: headerTreatment<typeof eduzzHeader, EduzzHeaderValues>({
      headerMissing: eduzzMissing,
      platformHeader: eduzzHeader,
      ...remainderHeaderValues
    }),
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
