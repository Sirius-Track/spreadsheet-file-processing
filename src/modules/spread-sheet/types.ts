import { platforms } from './validation/SpreadSheetSchema'

export type SpreadSheet = {
  dataUrl: string
  platform: (typeof platforms)[number]
  userId: string
  projectId: string
}

export type Row = Pick<SpreadSheet, 'platform'> & {
  user_id: string
  project_id: string
}

export type RowData = Row & {
  [key: string]: string
}
