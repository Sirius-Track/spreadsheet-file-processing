import axios from 'axios'

import { fetchContacts } from './shared/fetchContacts'

import { ContactFieldValue } from './types'

export const processSyncActiveCampaignBackground = async ({
  userId,
  projectId,
  launchId,
  tokenActive,
  listId,
  urlActive,
  ...rows
}: any) => {
  const BATCH_SIZE = 100
  const SUPABASE_URL = process.env.SUPABASE_URL || ''
  const API_KEY = process.env.API_KEY || ''

  try {
    const activeCampaignURL = 'https://sua_url_active_campaign'
    const activeCampaignToken = 'seu_token_da_api'
    const acListID = 'sua_id_da_lista'

    const contactValues = await fetchContacts(activeCampaignURL, activeCampaignToken, acListID, BATCH_SIZE)
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
}

async function postLeadList(leadList: ContactFieldValue[], apiKey: string, supabaseURL: string) {
  try {
    await axios.post(`${supabaseURL}/functions/v1/postLeadList`, leadList, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        Authorization: `Bearer ${apiKey}`
      }
    })
  } catch (error) {
    console.error('Erro ao enviar lista de leads:', error)
    throw error
  }
}