import { SpreadSheetSchema } from './validation/SpreadSheetSchema'

import { processCsvInBackground } from './processCsvInBackground'

import type { SpreadSheet } from './types'

export const spreadSheed = async (data: SpreadSheet) => {
  const { dataUrl, userId, platform, projectId } = SpreadSheetSchema.parse(data)

  console.log({
    dataUrl,
    userId,
    platform,
    projectId
  })

  const fileCSV = await fetch(dataUrl)

  if (!fileCSV.ok) {
    throw new Error('File not found')
  }

  const csvText = await fileCSV.text()

  if (!csvText) {
    throw new Error('File is empty')
  }

  processCsvInBackground({ userId, platform, projectId, csvText })
}
