import { hotmartHeader } from './headers'

import { getFormatedValue } from './getFormatedValue'

import type { ParseResult } from 'papaparse'
import type { Row, RowData } from '../types'

type Props = Row & {
  records: ParseResult<{
    [key: string]: string
  }>
}

export const hotmartFormattedRows = ({ records, platform, user_id, project_id }: Props) => {
  return records.data.map(row => {
    const formattedRow: RowData = {
      platform,
      user_id,
      project_id
    }

    for (const [header, value] of Object.entries({ ...row, ...formattedRow })) {
      const mappedHeader = hotmartHeader[header]

      const isFormatted = mappedHeader && ['transaction_date'].includes(mappedHeader.toLowerCase())

      if (mappedHeader) {
        formattedRow[mappedHeader] = getFormatedValue({ isFormatted, value })
      }
    }

    return formattedRow
  })
}
