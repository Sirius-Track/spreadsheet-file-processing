import { fetchContacts } from './shared/fetchContacts'
import { postLeadList } from './shared/postLeadList'

import { SpreadSheet } from './types'

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
  const SUPABASE_URL = process.env.SUPABASE_URL as string
  const API_KEY = process.env.API_KEY as string

  try {
    const contactValues = await fetchContacts({
      activeCampaignURL: urlActive,
      activeCampaignToken: tokenActive,
      acListID: listId,
      batchSize: BATCH_SIZE
    })

    await postLeadList(contactValues, API_KEY, SUPABASE_URL)

    // TODO: Mover a URL para o ambiente
    /* await axios.post(
      'https://siriusltv.com/api/1.1/wf/removefileafterupload/',
      { fileUrl: urlActive },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    ); */
  } catch (error) {
    console.error('Erro durante o processo:', error)
    throw error
  }

  return rows
}
