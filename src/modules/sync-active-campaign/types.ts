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
  phone?: string // se não vier no input pegar do active campaign
  conversion_page_url?: string
  fingerprint?: string
  utm_id?: string
  utm_campaign?: string
  utm_source?: string
  utm_medium?: string
  utm_content?: string
  utm_term?: string
  mac_id?: string
  gac_id?: string
  ttac_id?: string
  s_as_id?: string
  s_ad_id?: string
  event_id?: string
  launchId: string
  userId: string
  projectId: string
  listId: string
  urlActive: string
  tokenActive: string
}

type ReturnActiveCampaign = {
  name: string
  surname: string
  email: string
}
