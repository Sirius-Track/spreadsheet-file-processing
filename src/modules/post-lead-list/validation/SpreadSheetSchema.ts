import * as z from 'zod'

import type { SpreadSheet } from '../types'

export type LeadsTypes = Omit<SpreadSheet, 'platform'> & { launchId: string; openDate: string; closeDate: string }

export const SpreadSheetSchema = z.object<SchemaRequiredZod<LeadsTypes>>({
  dataUrl: z.string(),
  launchId: z.string(),
  userId: z.string(),
  projectId: z.string(),
  openDate: z.string(),
  closeDate: z.string()
})

export type SpreadSheetInput = z.infer<typeof SpreadSheetSchema>
