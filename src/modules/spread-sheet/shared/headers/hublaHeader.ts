import { genHash } from '../'

import type { Missing } from '../types'
import type { HeadersValues } from './types'

export type HublaHeaderValues = {
  transaction_code: string
  transaction_status: string
  transaction_date: string
  product_id: string
  product_name: string
  purchase_value_with_tax: string
  purchase_value_without_tax: string
  my_commission_value: string
  src_code: string
  payment_method: string
  total_installments: string
  coupon_code: string
  buyer_name: string
  buyer_email: string
  buyer_phone: string
  buyer_document: string
}

export const hublaHeader: HeadersValues<HublaHeaderValues> = {
  'ID da fatura': 'transaction_code',
  'Status da fatura': 'transaction_status',
  'Data de criação': 'transaction_date',
  'ID do produto': 'product_id',
  'Nome do produto': 'product_name',
  'Valor total': 'purchase_value_with_tax',
  'Valor do produto': 'purchase_value_without_tax',
  'Valor da sua comissão': 'my_commission_value',
  'UTM Origem': 'src_code',
  'Método de pagamento': 'payment_method',
  Parcelas: 'total_installments',
  'Cupom aplicado': 'coupon_code',
  'Nome do cliente': 'buyer_name',
  'Email do cliente': 'buyer_email',
  'Telefone do cliente': 'buyer_phone',
  'Documento do cliente': 'buyer_document'
}

export const hublaMissing = (row: Missing<HublaHeaderValues>) => {
  return {
    ...row,
    offer_id: genHash(row.product_name), // genHash(product_name)
    offer_name: genHash(row.product_name), // genHash(product_name)
    producer: 'undefined', // "Não fornecido pela plataforma."
    currency: 'BRL',
    commission_currency: 'BRL',
    sck_code: 'undefined', // "Não fornecido pela plataforma."
    total_charges: 0, // "Não fornecido pela plataforma."
    buyer_country: 'undefined', // "Não fornecido pela plataforma."
    buyer_state: 'undefined', // "Não fornecido pela plataforma."
    buyer_instagram: 'undefined', // "Não fornecido pela plataforma."
    order_bump_type: '(none)', // "Não fornecido pela plataforma."
    order_bump_transaction: 'undefined' // "Não fornecido pela plataforma."
  }
}
