import { genHash } from '../functions/genHash'

import { Missing } from '../types'
import { PlatformCustom } from '../../types'

export const customMissing = (row: Missing<PlatformCustom>) => {
  return {
    ...row,
    offer_id: genHash(`${row.product_name} - ${row.offer_name}`),
    producer: 'undefined', // "Não fornecido pela plataforma."
    sck_code: 'undefined', // "Não fornecido pela plataforma."
    total_charges: 0, // "Não fornecido pela plataforma."
    buyer_country: 'undefined', // "Não fornecido pela plataforma."
    buyer_instagram: 'undefined', // "Não fornecido pela plataforma."
    order_bump_type: '(none)', // "Não fornecido pela plataforma.",
    order_bump_transaction: 'undefined', // "Não fornecido pela plataforma."
    commission_currency: 'BRL' //same as currency
  }
}
