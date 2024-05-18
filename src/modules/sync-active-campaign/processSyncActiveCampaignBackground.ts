import axios from 'axios'
import papa from 'papaparse'

import { SpreadSheet } from './types'

type Props = SpreadSheet & {
  csvText: string
}

export const processSyncActiveCampaignBackground = async ({
  userId,
  projectId,
  launchId,
  csvText,
  urlActive,
  ...data
}: Props) => {
  const BATCH_SIZE = 100
  const SUPABASE_URL = process.env.SUPABASE_URL
  const API_KEY = process.env.API_KEY

  const records = papa.parse<SpreadSheet>(csvText, {
    header: true,
    skipEmptyLines: true
  })

  const sheetRows = records.data.map(row => ({
    ...row,
    user_id: userId,
    launch_id: launchId,
    project_id: projectId
  }))

  console.log(sheetRows[0])

  for (let count = 0; count < sheetRows.length; count += BATCH_SIZE) {
    const csvChunk = sheetRows.slice(count, count + BATCH_SIZE)

    await axios.post(`${SUPABASE_URL}/functions/v1/postLeadList`, csvChunk, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        Authorization: `Bearer ${API_KEY}`
      }
    })
  }

  // TODO: mover url para env
  await axios.post(
    'https://siriusltv.com/api/1.1/wf/removefileafterupload/',
    { fileUrl: urlActive },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}
