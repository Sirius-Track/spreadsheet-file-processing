import * as z from 'zod'

import type { SpreadSheet } from '../types'

export const SpreadSheetSchema = z.object<SchemaRequiredZod<SpreadSheet>>({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  phone: z.string(),
  creation_date: z.string(),
  subscribe_date: z.string(),
  conversion_page_url: z.string(),
  fingerprint: z.string(),
  utm_id: z.string(),
  utm_campaign: z.string(),
  utm_source: z.string(),
  utm_medium: z.string(),
  utm_content: z.string(),
  utm_term: z.string(),
  mac_id: z.string(),
  gac_id: z.string(),
  ttac_id: z.string(),
  s_as_id: z.string(),
  s_ad_id: z.string(),
  event_id: z.string(),
  listId: z.string(),
  launchId: z.string(),
  userId: z.string(),
  projectId: z.string(),
  urlActive: z.string(),
  tokenActive: z.string()
})

export type SpreadSheetInput = z.infer<typeof SpreadSheetSchema>