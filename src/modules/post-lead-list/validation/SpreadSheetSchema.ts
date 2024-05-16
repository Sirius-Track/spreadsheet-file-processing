import * as z from 'zod'

import type { SpreadSheet } from '../types'

export type LeadsTypes = Omit<SpreadSheet, 'platform'> & { launchId: string }

type SpreadSheetZod = {
  [k in keyof LeadsTypes]: z.ZodType<LeadsTypes[k]>
}

export const SpreadSheetSchema = z.object<SpreadSheetZod>({
  dataUrl: z.string(),
  launchId: z.string(),
  userId: z.string(),
  projectId: z.string()
})

export type SpreadSheetInput = z.infer<typeof SpreadSheetSchema>
