import { LeadsTypes, SpreadSheetSchema } from './validation/SpreadSheetSchema'

import { processPostLeadListBackground } from './processPostLeadListBackground'

export const spreadSheed = async (data: LeadsTypes) => {
  const { dataUrl, userId, projectId, launchId, openDate, closeDate } = SpreadSheetSchema.parse(data)

  const fileCSV = await fetch(dataUrl)

  if (!fileCSV.ok) {
    throw new Error('File not found')
  }

  const csvText = await fileCSV.text()

  if (!csvText) {
    throw new Error('File is empty')
  }

  processPostLeadListBackground({ launchId, dataUrl, userId, projectId, csvText, openDate, closeDate })
}
