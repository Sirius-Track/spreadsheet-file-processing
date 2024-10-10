import axios from 'axios'
import papa from 'papaparse'

import { formattingPlatformType } from './shared'
import { SUPABASE_URL } from '@/contants'

import { PlatformCustom, SpreadSheet } from './types'

type Props = SpreadSheet &
  Partial<PlatformCustom> & {
    csvText: string
  }

export const processPostCSVBackground = async ({ dataUrl, userId, platform, projectId, csvText, ...custom }: Props) => {
  const BATCH_SIZE = 500

  const records = papa.parse<{ [key: string]: string }>(csvText, {
    header: true,
    skipEmptyLines: true
  })

  const remainderHeaderValues = { records, platform, userId, projectId }

  const platformsRows = formattingPlatformType({ ...remainderHeaderValues, custom })

  for (let count = 0; count < platformsRows.length; count += BATCH_SIZE) {
    const csvChunk = platformsRows.slice(count, count + BATCH_SIZE)
    // Consolando o csvChunk antes de enviar
    //console.log('csvChunk:', JSON.stringify(csvChunk, null, 2))
    await axios.post(`${SUPABASE_URL}/functions/v1/postCSV`, csvChunk, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate'
      }
    })
  }

  // TODO: mover url para env
  await axios.post(
    'https://siriusltv.com/api/1.1/wf/removefileafterupload/',
    { fileUrl: dataUrl },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}
