import { hotmartHeader } from './headers'

import { getFormatedValue } from './getFormatedValue'

import type { ParseResult } from 'papaparse'

import { genHash } from './genHash'

import type { Row, RowData } from '../types'

type Props = Row & {
  records: ParseResult<{
    [key: string]: string
  }>
}

export const perfectPayMissing = (row: any) => {
  return {
    product_id: genHash(row.product_name), // genHash(product_name)
    offer_id: genHash(`${row.product_name} - ${row.offer}`), // genHash(product_name + offer)
    currency: undefined,
    purchase_value_with_tax: undefined,
    commission_currency: undefined,
    sck_code: undefined, // "Não fornecido pela plataforma."
    total_charges: undefined, // "Não fornecido pela plataforma."
    coupon_code: undefined, // "Não fornecido pela plataforma."
    buyer_country: undefined, // "Não fornecido pela plataforma."
    buyer_instagram: undefined, // "Não fornecido pela plataforma."
    order_bump_transaction: undefined, // "Não fornecido pela plataforma."
    order_bump_type: undefined // "Não fornecido pela plataforma."
  }
}

export const perfectPay = ({ records, platform, user_id, project_id }: Props) => {
  return records.data.map(row => {
    const formattedRow: RowData = {
      ...perfectPayMissing(row),
      platform,
      user_id,
      project_id
    }

    console.log(formattedRow)

    for (const [header, value] of Object.entries({ ...row, ...formattedRow })) {
      const mappedHeader = hotmartHeader[header]

      const isFormatted = Boolean(mappedHeader && ['transaction_date'].includes(mappedHeader.toLowerCase()))

      if (mappedHeader) {
        formattedRow[mappedHeader] = getFormatedValue({ isFormatted, value })
      }
    }

    return formattedRow
  })
}
