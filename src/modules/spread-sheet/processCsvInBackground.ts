import axios from 'axios'
import papa from 'papaparse'

import { headerTreatment } from './shared/headerTreatment'

import { SpreadSheet } from './types'
import {
  perfectpayHeader,
  perfectPayMissing,
  eduzzHeader,
  eduzzMissing,
  greennHeader,
  greennMissing,
  guruHeader,
  hublaHeader,
  tmbHeader,
  hotmartHeader,
  kiwifyHeader,
  tictHeader,
  kiwifyMissing,
  hublaMissing
} from './shared/headers'

import type {
  EduzzHeaderValues,
  GreennHeaderValues,
  PerfectpayHeaderValues,
  GuruHeaderValues,
  HublaHeaderValues,
  TmbHeaderValues,
  HotmartHeaderValues,
  KiwifyHeaderValues,
  TictHeaderValues
} from './shared/headers'

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
    kiwify: headerTreatment<typeof kiwifyHeader, KiwifyHeaderValues>({
      headerMissing: kiwifyMissing,
      platformHeader: kiwifyHeader,
      ...remainderHeaderValues
    }),
    eduzz: headerTreatment<typeof eduzzHeader, EduzzHeaderValues>({
      headerMissing: eduzzMissing,
      platformHeader: eduzzHeader,
      ...remainderHeaderValues
    }),
    greenn: headerTreatment<typeof greennHeader, GreennHeaderValues>({
      headerMissing: greennMissing,
      platformHeader: greennHeader,
      ...remainderHeaderValues
    }),
    tmb: headerTreatment<typeof tmbHeader, TmbHeaderValues>({
      headerMissing: perfectPayMissing,
      platformHeader: tmbHeader,
      ...remainderHeaderValues
    }),
    hubla: headerTreatment<typeof hublaHeader, HublaHeaderValues>({
      headerMissing: hublaMissing,
      platformHeader: hublaHeader,
      ...remainderHeaderValues
    }),
    guru: headerTreatment<typeof guruHeader, GuruHeaderValues>({
      headerMissing: perfectPayMissing,
      platformHeader: guruHeader,
      ...remainderHeaderValues
    }),
    ticto: headerTreatment<typeof tictHeader, TictHeaderValues>({
      headerMissing: perfectPayMissing,
      platformHeader: tictHeader,
      ...remainderHeaderValues
    })
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
