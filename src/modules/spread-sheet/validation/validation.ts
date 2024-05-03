import * as z from 'zod'

import type { SpreadSheet } from '../types'

type SpreadSheetZod = {
  [k in keyof SpreadSheet]: z.ZodType<SpreadSheet[k]>
}

export const SpreadSheetSchema = z.object<SpreadSheetZod>({
  dataUrl: z.string(),
  userId: z.string(),
  projectId: z.string(),
  sendTo: z.string()
})

export type SpreadSheetInput = z.infer<typeof SpreadSheetSchema>
