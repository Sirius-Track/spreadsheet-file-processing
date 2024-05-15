import { genHash } from '../'

import type { Missing } from '../types'
import type { HeadersValues } from './types'

export type HerosparkHeaderValues = {
  id: string
  offer_name: string
  transaction_code: string
  transaction_date: string
  product_name: string
  purchase_value_with_tax: string
  purchase_value_without_tax: string
  src_code: string
  payment_method: string
  total_installments: string
  coupon_code: string
  buyer_name: string
  buyer_email: string
  buyer_phone: string
  buyer_document: string
  buyer_state: string
  user_id: string
  project_id: string
  platform: string
}

export const herosparkHeader: HeadersValues<HerosparkHeaderValues> = {
  id: 'id',
  'ID Pagamento': 'transaction_code',
  'Data de Compra': 'transaction_date', // Formato que a data vem: 10/07/2023 23:04:32
  'Produto Principal': 'product_name',
  'Após Taxas': 'purchase_value_with_tax', //R$374,75 ( o valor vem assim, talvez precise formatar)
  'Faturamento Bruto': 'purchase_value_without_tax', //R$374,75 ( o valor vem assim, talvez precise formatar)
  'Origem (SRC)': 'src_code',
  'Método de Pagamento': 'payment_method',
  Parcelas: 'total_installments',
  'Código Cupom': 'coupon_code',
  'Nome do Comprador': 'buyer_name',
  email: 'buyer_email',
  '"DDI" + "Telefone"': 'buyer_phone', //@Diego aqui o buyer_phone é a juncao do header DDI + Telefone
  'ID Documento Comprador': 'buyer_document',
  Estado: 'buyer_state',
  user_id: 'user_id',
  project_id: 'project_id',
  plataform: 'platform'
}

export const herosparkMissing = (row: Missing<HerosparkHeaderValues>) => {
  return {
    ...row,
    offer_id: genHash(row.product_name), // genHash(product_name)
    offer_name: row.offer_name ? genHash(row.offer_name) : genHash(row.product_name), // genHash(product_name) or genHash(offer_name)
    purchase_value_with_tax: formatValue(row.purchase_value_with_tax),
    purchase_value_without_tax: formatValue(row.purchase_value_without_tax),
    buyer_phone: `${row.buyer_phone} ${row.buyer_document}`, // buyer_phone + buyer_document
    transaction_status: 'undefined', // "Não fornecido pela plataforma."
    producer: 'undefined', // "Não fornecido pela plataforma."
    product_id: 'undefined', // "Não fornecido pela plataforma."
    currency: 'BRL',
    commission_currency: 'BRL',
    sck_code: 'undefined', // "Não fornecido pela plataforma."
    total_charges: 0, // "Não fornecido pela plataforma."
    buyer_country: 'undefined', // "Não fornecido pela plataforma."
    buyer_instagram: 'undefined', // "Não fornecido pela plataforma."
    order_bump_type: '(none)', // "Não fornecido pela plataforma."
    order_bump_transaction: 'undefined' // "Não fornecido pela plataforma."
  }
}

const formatValue = (value: string): string => {
  const cleanedValue = value.replace(/R\$/g, '')
  const formattedValue = cleanedValue.replace(/,/g, '.')

  return formattedValue
}
