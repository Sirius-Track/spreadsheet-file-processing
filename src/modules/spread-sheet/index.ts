import { readFile, unlink } from 'node:fs/promises'

import Papa from 'papaparse'

import type { SpreadSheet } from './types'

import { SpreadSheetSchema } from './validation/validation'

export const spreadSheed = async (data: SpreadSheet) => {
  const { dataUrl, userId, projectId, sendTo } = SpreadSheetSchema.parse(data)

  console.log({ dataUrl, userId, projectId, sendTo })

  const fileCSV = await fetch(dataUrl)

  if (!fileCSV.ok) {
    throw new Error('File not found')
  }
}
