export type SpreadSheet = {
  dataUrl: string
  userId: string
  projectId: string
}

export type Row = {
  user_id: string
  launch_id: string
  project_id: string
}

export type RowData = Row & {
  [key: string]: string
}
