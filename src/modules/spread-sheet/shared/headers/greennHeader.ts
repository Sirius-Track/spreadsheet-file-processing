import { genHash } from '../'

import type { Missing } from '../types'
import type { HeadersValues } from './types'

export type GreennHeaderValues = {
  transaction_code: string
  transaction_status: string
  transaction_date: string
  product_name: string
  offer_id: string
  offer_name: string
  purchase_value_with_tax: string
  purchase_value_without_tax: string
  payment_method: string
  total_installments: string
  buyer_name: string
  buyer_email: string
  buyer_country: string
  buyer_phone: string
  buyer_document: string
  buyer_state: string
}

export const greennHeader: HeadersValues<GreennHeaderValues> = {
  'Código da venda': 'transaction_code',
  'Status da venda': 'transaction_status',
  Data: 'transaction_date',
  'Nome do produto': 'product_name',
  'Código da Oferta': 'offer_id',
  'Nome da Oferta': 'offer_name',
  'Valor Líquido': 'purchase_value_with_tax',
  'Valor Bruto': 'purchase_value_without_tax',
  'Método de pagamento': 'payment_method',
  'Parcelas contrato assinatura': 'total_installments',
  'Nome do cliente': 'buyer_name',
  'Email do cliente': 'buyer_email',
  'Código País': 'buyer_country',
  Telefone: 'buyer_phone',
  Documento: 'buyer_document',
  'Estado do cliente': 'buyer_state'
}

export const greennMissing = (row: Missing<GreennHeaderValues>) => {
  return {
    ...row,
    product_id: genHash(`${row.product_name} - ${row.offer_name}`),
    producer: 'undefined', // "Não fornecido pela plataforma."
    currency: 'undefined',
    commission_currency: 'undefined',
    my_commission_value: 'undefined',
    src_code: 'undefined', // "Não fornecido pela plataforma."
    sck_code: 'undefined', // "Não fornecido pela plataforma."
    total_charges: 'undefined', // "Não fornecido pela plataforma."
    coupon_code: 'undefined', // "Não fornecido pela plataforma."
    buyer_instagram: 'undefined', // "Não fornecido pela plataforma."
    order_bump_type: 'undefined', // "Não fornecido pela plataforma."
    order_bump_transaction: 'undefined' // "Não fornecido pela plataforma."
  }
}
