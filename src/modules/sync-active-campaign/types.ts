interface Contact {
  id: string
}

export interface ContactFieldValue {
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

export interface ActiveCampaignContactValues {
  fieldValues: ContactFieldValue[]
}

export interface ActiveCampaignResponse {
  contacts: Contact[]
  meta: {
    total: number
  }
}

export type SpreadSheet = {
  name: string
  surname: string
  email: string
  phone: string
  creation_date: string
  subscribe_date: string
  conversion_page_url: string
  fingerprint: string
  utm_id: string
  utm_campaign: string
  utm_source: string
  utm_medium: string
  utm_content: string
  utm_term: string
  mac_id: string
  gac_id: string
  ttac_id: string
  s_as_id: string
  s_ad_id: string
  event_id: string
  listId: string
  launchId: string
  userId: string
  projectId: string
  urlActive: string
  tokenActive: string
}
