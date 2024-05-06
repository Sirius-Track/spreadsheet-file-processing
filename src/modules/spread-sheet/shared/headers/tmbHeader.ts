import { genHash } from '../'

import type { Missing } from '../types'
import type { HeadersValues } from './types'

export type TmbHeaderValues = {
  transaction_code: string
  transaction_status: string
  transaction_date: string
  producer: string
  product_name: string
  purchase_value_without_tax: string
  src_code: string
  payment_method: string
  buyer_name: string
  buyer_email: string
  buyer_country: string
  buyer_phone: string
  buyer_document: string
  buyer_state: string
}

export const tmbHeader: HeadersValues<TmbHeaderValues> = {
  Pedido: 'transaction_code',
  Status: 'transaction_status',
  'Criado Em': 'transaction_date',
  Produtor: 'producer',
  Produto: 'product_name',
  'Ticket (R$)': 'purchase_value_without_tax',
  utm_source: 'src_code',
  'Modalidade de Contrato': 'payment_method',
  'Cliente Nome': 'buyer_name',
  'Cliente Email': 'buyer_email',
  País: 'buyer_country',
  Telefone: 'buyer_phone',
  'Cliente CPF': 'buyer_document',
  Estado: 'buyer_state'
}

export const tmbMissing = (row: Missing<TmbHeaderValues>) => {
  return {
    ...row,
    product_id: genHash(row.product_name), // genHash(product_name)
    offer_id: genHash(row.product_name), // genHash(product_name)
    offer_name: genHash(row.product_name), // genHash(product_name)
    currency: 'BRL',
    purchase_value_with_tax: 'undefined',
    commission_currency: 'BRL', // "Não fornecido pela plataforma."
    my_commission_value: 'undefined', // "Não fornecido pela plataforma."
    sck_code: 'undefined', // "Não fornecido pela plataforma."
    total_installments: 'undefined', // "Não fornecido pela plataforma."
    total_charges: 0, // "Não fornecido pela plataforma."
    coupon_code: 'undefined', // "Não fornecido pela plataforma."
    buyer_instagram: 'undefined', // "Não fornecido pela plataforma."
    order_bump_type: 'undefined', // "Não fornecido pela plataforma."
    order_bump_transaction: 'undefined' // "Não fornecido pela plataforma."
  }
}
