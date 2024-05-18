import { LeadsTypes, SpreadSheetSchema } from './validation/SpreadSheetSchema'

import { processSyncActiveCampaignBackground } from './processSyncActiveCampaignBackground'

export const spreadSheed = async (data: LeadsTypes) => {
  const spreadSheet = SpreadSheetSchema.parse(data)

  const fileCSV = await fetch(spreadSheet.urlActive)

  if (!fileCSV.ok) {
    throw new Error('File not found')
  }

  const csvText = await fileCSV.text()

  if (!csvText) {
    throw new Error('File is empty')
  }

  processSyncActiveCampaignBackground({ ...spreadSheet, csvText })
}
