import { perfectpayHeader, perfectPayMissing, getFormatedValue } from '.'

import type { ParseResult } from 'papaparse'
import type { Row, RowData } from '../types'

type Props = Omit<Row, 'user_id' | 'project_id'> & {
  userId: string
  projectId: string
  records: ParseResult<{
    [key: string]: string
  }>
}

export const headerTreatment = ({ records, platform, userId, projectId }: Props) => {
  const headersAlreadyChanged = records.data.map(row => {
    const formattedRow: RowData = {
      platform,
      user_id: userId,
      project_id: projectId
    }

    for (const [header, value] of Object.entries({ ...row, ...formattedRow })) {
      const mappedHeader = perfectpayHeader[header]

      const isFormatted = Boolean(mappedHeader && ['transaction_date'].includes(mappedHeader.toLowerCase()))

      if (mappedHeader) {
        formattedRow[mappedHeader] = getFormatedValue({ isFormatted, value })
      }
    }

    return formattedRow
  })

  const missingHeaders = () => {
    if (platform === 'hotmart') {
      return headersAlreadyChanged
    }

    const headersAlreadyChangedMissingTreaties = headersAlreadyChanged.map(row => perfectPayMissing(row as any))

    return headersAlreadyChangedMissingTreaties
  }

  return missingHeaders()
}
