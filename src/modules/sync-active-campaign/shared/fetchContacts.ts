import axios from 'axios'

import { ActiveCampaignContactValues, ActiveCampaignResponse, ContactFieldValue } from '../types'

async function getContactValues(
  contactIds: string[],
  activeCampaignURL: string,
  activeCampaignToken: string
): Promise<ContactFieldValue[]> {
  const contacts: ContactFieldValue[] = []
  try {
    for (const id of contactIds) {
      const { data, status } = await axios.get<ActiveCampaignContactValues>(
        `${activeCampaignURL}/api/3/contacts/${id}/fieldValues`,
        {
          headers: {
            'Api-Token': activeCampaignToken
          }
        }
      )

      if (status !== 200) {
        throw new Error('Erro ao obter contatos da lista')
      }

      contacts.push(...data.fieldValues)
    }
  } catch (error) {
    console.error('Erro ao obter contatos da lista:', error)
    throw error
  }
  return contacts
}

export const fetchContacts = async (
  activeCampaignURL: string,
  activeCampaignToken: string,
  acListID: string,
  batchSize: number
): Promise<ContactFieldValue[]> => {
  const contacts: ContactFieldValue[] = []
  try {
    const { data, status } = await axios.get<ActiveCampaignResponse>(`${activeCampaignURL}/api/3/contacts`, {
      headers: {
        'Api-Token': activeCampaignToken
      },
      params: {
        listid: acListID,
        limit: batchSize
      }
    })

    if (status !== 200) {
      throw new Error('Erro ao obter contatos da lista')
    }

    let offset = 0
    while (offset < data.meta.total) {
      const contactIds = data.contacts.map(contact => contact.id)
      const contactValues = await getContactValues(contactIds, activeCampaignURL, activeCampaignToken)
      contacts.push(...contactValues.slice(offset, offset + batchSize))
      offset += batchSize
    }
  } catch (error) {
    console.error('Erro durante o processo de busca de contatos:', error)
    throw error
  }
  return contacts
}