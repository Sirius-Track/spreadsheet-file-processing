import axios from 'axios'
import papa from 'papaparse'

import { formattingPlatformType } from './shared'

import { PlatformCustom, SpreadSheet } from './types'

type Props = SpreadSheet &
  Partial<PlatformCustom> & {
    csvText: string
  }

export const processPostCSVBackground = async ({ dataUrl, userId, platform, projectId, csvText, ...custom }: Props) => {
  const BATCH_SIZE = 500
  const SUPABASE_URL = process.env.SUPABASE_URL

  const records = papa.parse<{ [key: string]: string }>(csvText, {
    header: true,
    skipEmptyLines: true
  })

  const remainderHeaderValues = { records, platform, userId, projectId }

  const platformsRows = formattingPlatformType({ ...remainderHeaderValues, custom })

  console.log('nao enviado')

  for (let count = 0; count < platformsRows.length; count += BATCH_SIZE) {
    const csvChunk = platformsRows.slice(count, count + BATCH_SIZE)

    await axios.post(`${SUPABASE_URL}/functions/v1/postCSV`, csvChunk, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate'
      }
    })
  }

  console.log('enviado com sucesso')

  // TODO: mover url para env
  await axios.post(
    'https://siriusltv.com/api/1.1/wf/removefileafterupload/',
    { fileUrl: dataUrl },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}
