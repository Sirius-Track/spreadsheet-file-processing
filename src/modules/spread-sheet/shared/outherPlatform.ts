import { perfectpayHeader, perfectPayMissing } from './headers'

import { getFormatedValue } from './getFormatedValue'

import type { ParseResult } from 'papaparse'

import type { Row, RowData } from '../types'

type Props = Row & {
  records: ParseResult<{
    [key: string]: string
  }>
}

export const perfectPay = ({ records, platform, user_id, project_id }: Props) => {
  console.log('perfectPay')

  const headersAlreadyChanged = records.data.map(row => {
    const formattedRow: RowData = {
      platform,
      user_id,
      project_id
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

  const missingHeaders = headersAlreadyChanged.map(row => {
    return perfectPayMissing(row as any)
  })

  console.log(missingHeaders[0])

  return missingHeaders
}
