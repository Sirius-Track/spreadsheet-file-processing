import { processSyncActiveCampaignBackground } from './processSyncActiveCampaignBackground'

import { SpreadSheetSchema } from './validation/SpreadSheetSchema'

import { SpreadSheet } from './types'

export const spreadSheed = async (data: SpreadSheet) => {
  const spreadSheet = SpreadSheetSchema.parse(data)

  await processSyncActiveCampaignBackground(spreadSheet)
}
