import axios from 'axios'

import { SpreadSheet } from './types'
interface ActiveCampaignContactValues {
  fieldValues: [
    {
      contact: string
      field: string
      value: string
      cdate: string
      udate: string
      created_by: string
      updated_by: string
      links: {
        owner: string
        field: string
      }
      id: string
      owner: string
    }
  ]
}

export const processSyncActiveCampaignBackground = async ({
  userId,
  projectId,
  launchId,
  tokenActive,
  listId,
  urlActive,
  ...rows
}: SpreadSheet) => {
  const BATCH_SIZE = 100
  const SUPABASE_URL = process.env.SUPABASE_URL
  const API_KEY = process.env.API_KEY

  /* const sheetRows = records.data.map(row => ({
    ...row,
    user_id: userId,
    launch_id: launchId,
    project_id: projectId
  })) */

  const { data } = await axios.get<ActiveCampaignContactValues>(`${urlActive}/api/3/contacts/${listId}/fieldValues`, {
    headers: {
      'Api-Token': tokenActive
    }
  })

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
