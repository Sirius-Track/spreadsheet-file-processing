import { genHash } from '../'

import type { Missing } from '../types'
import type { HeadersValues } from './types'

export type KiwifyHeaderValues = {
  transaction_code: string
  transaction_status: string
  transaction_date: string
  product_name: string
  offer_name: string
  currency: string
  purchase_value_with_tax: string
  purchase_value_without_tax: string
  my_commission_value: string
  src_code: string
  sck_code: string
  payment_method: string
  total_installments: string
  coupon_code: string
  buyer_name: string
  buyer_email: string
  buyer_phone: string
  buyer_document: string
  buyer_state: string
  buyer_instagram: string
}

export const kiwifyHeader: HeadersValues<KiwifyHeaderValues> = {
  'ID da venda': 'transaction_code',
  Status: 'transaction_status',
  'Data de Criação': 'transaction_date',
  Produto: 'product_name',
  Oferta: 'offer_name',
  Moeda: 'currency',
  'Total com acréscimo': 'purchase_value_with_tax',
  'Preço base do produto': 'purchase_value_without_tax',
  'Valor líquido': 'my_commission_value',
  'Tracking src': 'src_code',
  'Tracking sck': 'sck_code',
  Pagamento: 'payment_method',
  Parcelas: 'total_installments',
  'Coupon Code': 'coupon_code',
  Cliente: 'buyer_name',
  Email: 'buyer_email',
  Celular: 'buyer_phone',
  CPF: 'buyer_document',
  Estado: 'buyer_state',
  instagram: 'buyer_instagram'
}

export const kiwifyMissing = (row: Missing<KiwifyHeaderValues>) => {
  return {
    ...row,
    product_id: genHash(row.product_name), // genHash(product_name)
    offer_id: genHash(`${row.product_name} - ${row.offer_name}`), // genHash(product_name + offer)
    producer: 'undefined', // "Não fornecido pela plataforma."
    total_charges: 0, // "Não fornecido pela plataforma."
    buyer_country: 'undefined', // "Não fornecido pela plataforma."
    order_bump_type: 'undefined', // "Não fornecido pela plataforma."
    order_bump_transaction: 'undefined' // "Não fornecido pela plataforma."
  }
}
