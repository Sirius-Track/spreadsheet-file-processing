import { SpreadSheetSchema } from './validation/SpreadSheetSchema'

import { processPostCSVBackground } from './processCsvInBackground'

import type { SpreadSheet } from './types'

export const spreadSheed = async (data: SpreadSheet) => {
  const { dataUrl, userId, platform, projectId, ...rest } = SpreadSheetSchema.parse(data)

  console.log({ data })

  const fileCSV = await fetch(dataUrl)

  if (!fileCSV.ok) {
    throw new Error('File not found')
  }

  const csvText = await fileCSV.text()

  if (!csvText) {
    throw new Error('File is empty')
  }

  processPostCSVBackground({ dataUrl, userId, platform, projectId, csvText, ...rest })
}
