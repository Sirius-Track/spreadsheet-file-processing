export type SpreadSheet = {
  dataUrl: string
  platform: 'hotmart' | 'kiwify' | 'eduzz' | 'perfectpay' | 'greenn' | 'tmb' | 'hubla' | 'guru' | 'ticto'
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
