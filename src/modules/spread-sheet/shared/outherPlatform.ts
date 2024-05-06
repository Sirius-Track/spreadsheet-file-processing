import { perfectpayHeader } from './headers'

import { getFormatedValue } from './getFormatedValue'

import type { ParseResult } from 'papaparse'

import { genHash } from './genHash'

import type { Row, RowData } from '../types'
import { parseFloatValue } from './fixvalues'

type Props = Row & {
  records: ParseResult<{
    [key: string]: string
  }>
}

type PerfectpayHeaderValues = (typeof perfectpayHeader)[keyof typeof perfectpayHeader]

type PerfectpayRow = {
  [K in PerfectpayHeaderValues]: string
}

export const perfectPayMissing = (row: PerfectpayRow) => {
  return {
    ...row,
    product_id: genHash(row.product_name),
    offer_id: genHash(`${row.product_name} - ${row.offer_name}`),
    purchase_value_without_tax: parseFloatValue(row.purchase_value_without_tax),
    my_commission_value: parseFloatValue(row.my_commission_value),
    currency: 'BRL',
    purchase_value_with_tax: 'undefined',
    commission_currency: 'undefined',
    sck_code: 'undefined', // "Não fornecido pela plataforma."
    total_charges: 'undefined', // "Não fornecido pela plataforma."
    coupon_code: 'undefined', // "Não fornecido pela plataforma."
    buyer_country: 'undefined', // "Não fornecido pela plataforma."
    buyer_instagram: 'undefined', // "Não fornecido pela plataforma."
    order_bump_transaction: 'undefined', // "Não fornecido pela plataforma."
    order_bump_type: '(none)' // "Não fornecido pela plataforma."
  }
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
    return perfectPayMissing(row as any as PerfectpayRow)
  })

  console.log(missingHeaders[0])

  return missingHeaders
}
