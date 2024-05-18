import * as z from 'zod'

import type { SpreadSheet } from '../types'

export type LeadsTypes = Omit<SpreadSheet, 'platform'> & { launchId: string }

export const SpreadSheetSchema = z.object<SchemaRequiredZod<LeadsTypes>>({
  dataUrl: z.string(),
  launchId: z.string(),
  userId: z.string(),
  projectId: z.string()
})

export type SpreadSheetInput = z.infer<typeof SpreadSheetSchema>
