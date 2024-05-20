import * as z from 'zod'

export const SpreadSheetSchema = z.object({
  phone: z.string().optional(),
  conversion_page_url: z.string().optional(),
  fingerprint: z.string().optional(),
  utm_id: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
  mac_id: z.string().optional(),
  gac_id: z.string().optional(),
  ttac_id: z.string().optional(),
  s_as_id: z.string().optional(),
  s_ad_id: z.string().optional(),
  event_id: z.string().optional(),
  listId: z.string(),
  launchId: z.string(),
  userId: z.string(),
  projectId: z.string(),
  urlActive: z.string(),
  tokenActive: z.string()
})

export type SpreadSheetInput = z.infer<typeof SpreadSheetSchema>
