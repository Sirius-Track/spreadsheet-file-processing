import { hotmartHeader, perfectpayHeader } from './headers'

import { getFormatedValue } from './getFormatedValue'

import type { ParseResult } from 'papaparse'

import { genHash } from './genHash'

import type { Row, RowData } from '../types'

type Props = Row & {
  records: ParseResult<{
    [key: string]: string
  }>
}

export const perfectPayMissing = (row: any | undefined) => {
  return {
    ...row,
    product_id: genHash(row?.product_name), // genHash(product_name)
    offer_id: genHash(`${row?.product_name} - ${row?.offer}`), // genHash(product_name + offer)
    currency: 'BRL',
    purchase_value_with_tax: '',
    commission_currency: '',
    sck_code: '', // "Não fornecido pela plataforma."
    total_charges: '', // "Não fornecido pela plataforma."
    coupon_code: '', // "Não fornecido pela plataforma."
    buyer_country: '', // "Não fornecido pela plataforma."
    buyer_instagram: '', // "Não fornecido pela plataforma."
    order_bump_transaction: '', // "Não fornecido pela plataforma."
    order_bump_type: '' // "Não fornecido pela plataforma."
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

    console.log(formattedRow)

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
    return perfectPayMissing(row)
  })

  console.log(missingHeaders[0])

  return missingHeaders
}
