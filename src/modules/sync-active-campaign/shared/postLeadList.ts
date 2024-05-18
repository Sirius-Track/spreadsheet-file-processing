import axios from 'axios'

import { ContactFieldValue } from '../types'

export async function postLeadList(leadList: Array<ContactFieldValue>, apiKey: string, supabaseURL: string) {
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
