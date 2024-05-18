import axios from 'axios'
import papa from 'papaparse'

import { LeadsTypes } from './validation/SpreadSheetSchema'
import { RowData } from './types'
import { getFormatedValue } from '../../shared/getFormatedValue'

type Props = LeadsTypes & {
  csvText: string
  openDate: string
  closeDate: string
}

export const processPostLeadListBackground = async ({
  dataUrl,
  userId,
  projectId,
  launchId,
  csvText,
  openDate,
  closeDate
}: Props) => {
  const BATCH_SIZE = 500
  const SUPABASE_URL = process.env.SUPABASE_URL
  const API_KEY = process.env.API_KEY

  const records = papa.parse<{ [key: string]: string }>(csvText, {
    header: true,
    skipEmptyLines: true
  })
  const platformsRows = records.data.map(row => {
    const formattedRow: RowData = {
      user_id: userId,
      launch_id: launchId,
      project_id: projectId,
      openDate,
      closeDate
    }

    for (const [header, value] of Object.entries({ ...row, ...formattedRow })) {
      const isFormattedDate = Boolean(['creation_date', 'subscribe_date'].includes(header.toLowerCase()))

      formattedRow[header] = getFormatedValue({ isFormattedDate, value })
    }

    return formattedRow
  })

  console.log(platformsRows[0])

  for (let count = 0; count < platformsRows.length; count += BATCH_SIZE) {
    const csvChunk = platformsRows.slice(count, count + BATCH_SIZE)

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
    { fileUrl: dataUrl },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}
