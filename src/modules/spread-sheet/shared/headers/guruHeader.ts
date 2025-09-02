import { genHash, formatCurrency } from '../'

import type { Missing } from '../types'
import type { HeadersValues } from './types'

export type GuruHeaderValues = {
  transaction_code: string
  transaction_status: string
  transaction_date: string
  product_id: string
  product_name: string
  offer_name: string
  currency: string
  purchase_value_with_tax: string
  purchase_value_without_tax: string
  src_code: string
  sck_code: string
  payment_method: string
  total_installments: string
  coupon_code: string
  buyer_name: string
  buyer_email: string
  buyer_country: string
  buyer_phone: string
  buyer_phone_number: string
  buyer_dddi: string
  buyer_document: string
  buyer_state: string
}

export const guruHeader: HeadersValues<GuruHeaderValues> = {
  'id transação': 'transaction_code',
  status: 'transaction_status',
  'data pedido': 'transaction_date',
  'id produto': 'product_id',
  'nome produto': 'product_name',
  'nome oferta': 'offer_name',
  moeda: 'currency',
  'valor líquido': 'purchase_value_with_tax',
  'valor produtos': 'purchase_value_without_tax',
  'origem rppc venda': 'src_code',
  'rppc checkout': 'sck_code',
  pagamento: 'payment_method',
  parcelas: 'total_installments',
  'cupom código': 'coupon_code',
  'nome contato': 'buyer_name',
  'email contato': 'buyer_email',
  'país contato': 'buyer_country',
  'codigo telefone contato': 'buyer_dddi',
  'telefone contato': 'buyer_phone_number',
  'doc contato': 'buyer_document',
  'estado contato': 'buyer_state'
}

export const guruMissing = (row: Missing<GuruHeaderValues>) => {
  return {
    ...row,
    offer_id: genHash(`${row.product_name} - ${row.offer_name}`), // genHash(product_name + offer)
    purchase_value_without_tax: formatCurrency(row.purchase_value_without_tax),
    purchase_value_with_tax: formatCurrency(row.purchase_value_with_tax), // transforma "1.997,00" | "5,00" em "1997.00" | "5.00"
    producer: 'undefined', // "Não fornecido pela plataforma."
    commission_currency: 'BRL', // "Não fornecido pela plataforma."
    my_commission_value: 'undefined', // "Não fornecido pela plataforma."
    total_charges: 0, // "Não fornecido pela plataforma."
    buyer_instagram: 'undefined', // "Não fornecido pela plataforma."
    order_bump_type: '(none)', // "Não fornecido pela plataforma."
    buyer_phone: `${row.buyer_dddi}${row.buyer_phone_number}`,
    order_bump_transaction: 'undefined' // "Não fornecido pela plataforma."
  }
}
