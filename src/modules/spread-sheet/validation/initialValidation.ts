import { SpreadSheetSchema } from './validation'

import * as z from 'zod'

import type { SpreadSheet } from '../types'

export const initialValidation = (data: SpreadSheet) => {
  try {
    const validationResult = SpreadSheetSchema.parse(data)

    return validationResult
  } catch (error) {
    if (error instanceof z.ZodError) {
      const field = error.errors[0].path[0]

      throw new Error(`O campo ${field} é obrigatório`)
    }
    throw error
  }
}
