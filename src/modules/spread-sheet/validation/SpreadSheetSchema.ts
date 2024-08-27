import * as z from 'zod'

import type { SpreadSheet } from '../types'

export const platforms = [
  'hotmart',
  'kiwify',
  'eduzz',
  'herospark',
  'perfectpay',
  'greenn',
  'tmb',
  'hubla',
  'guru',
  'voompheader',
  'ticto',
  'custom'
] as const

export const SpreadSheetSchema = z.object<SchemaRequiredZod<SpreadSheet>>({
  dataUrl: z.string(),
  platform: z.custom(value => {
    if (!platforms.includes(value)) {
      throw new Error(`Invalid platform: ${value}, must be one of ${platforms.join(', ')}`)
    }

    return value
  }),
  userId: z.string(),
  projectId: z.string()
})

export type SpreadSheetInput = z.infer<typeof SpreadSheetSchema>
