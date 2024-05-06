import { genHash, parseFloatValue } from '../'

import type { Missing } from '../types'
import type { HeadersValues } from './types'

export type EduzzHeaderValues = {
  transaction_code: string
  transaction_status: string
  transaction_date: string
  product_id: string
  product_name: string
  offer_name: string
  currency: string
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
  buyer_state: string
}
export const eduzzHeader: HeadersValues<EduzzHeaderValues> = {
  Fatura: 'transaction_code',
  Status: 'transaction_status',
  'Data de Criação': 'transaction_date',
  'ID do Produto': 'product_id',
  Produto: 'product_name',
  'Nome da Oferta': 'offer_name',
  Moeda: 'currency',
  'Valor da Venda com Juros': 'purchase_value_with_tax',
  'Valor da Venda': 'purchase_value_without_tax',
  'Ganho Liquido': 'my_commission_value',
  'UTM Source': 'src_code',
  'Forma de Pagamento': 'payment_method',
  'Nº Parcelas': 'total_installments',
  Cupom: 'coupon_code',
  'Cliente / Nome': 'buyer_name',
  'Cliente / E-mail': 'buyer_email',
  'Cliente / Fones': 'buyer_phone',
  'Cliente / Documento': 'buyer_document',
  UF: 'buyer_state'
}

export const eduzzMissing = (row: Missing<EduzzHeaderValues>) => {
  return {
    ...row,
    offer_id: genHash(`${row.product_name} - ${row.offer_name}`),
    producer: 'undefined', // "Não fornecido pela plataforma."
    sck_code: 'undefined', // "Não fornecido pela plataforma."
    total_charges: 'undefined', // "Não fornecido pela plataforma."
    buyer_country: 'undefined', // "Não fornecido pela plataforma."
    buyer_instagram: 'undefined', // "Não fornecido pela plataforma."
    order_bump_type: 'undefined', // "Não fornecido pela plataforma.",
    order_bump_transaction: 'undefined', // "Não fornecido pela plataforma."
    commission_currency: 'undefined' //same as currency
  }
}
