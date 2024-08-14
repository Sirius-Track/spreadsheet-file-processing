export type SurveySheet = {
  dataUrl: string
  userId: string
  projectId: string
  type: 'lead' | 'buyer'
}

export type Row = Pick<SurveySheet, 'type'> & {
  survey_id: string
  user_id: string
  project_id: string
  response_date: string
  email: string
  phone?: string
  name?: string
}

export type RowData = Row & {
  question: string
  answer: string
  is_multiplechoice: boolean
}
