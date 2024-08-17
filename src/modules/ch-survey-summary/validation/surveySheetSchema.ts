import * as z from 'zod'
import type { SurveySheet } from '../types'

export type SurveyTypes = SurveySheet & {
  surveyName: string
  dateMask: string
  emailMask: string
  phoneMask: string
  nameMask: string
}

export const SurveySheetSchema = z.object<SchemaRequiredZod<SurveyTypes>>({
  dataUrl: z.string(),
  userId: z.string(),
  projectId: z.string(),
  surveyName: z.string(),
  dateMask: z.string(),
  emailMask: z.string(),
  phoneMask: z.string(),
  nameMask: z.string(),
  type: z.enum(['lead', 'buyer'])
})

export type SurveySheetInput = z.infer<typeof SurveySheetSchema>
