import { genHash, parseFloatValue } from '../'

import type { Missing } from '../types'
import type { HeadersValues } from './types'

export type PerfectpayHeaderValues = {
  transaction_code: string
  transaction_status: string
  transaction_date: string
  producer: string
  product_name: string
  offer_name: string
  purchase_value_without_tax: string
  my_commission_value: string
  src_code: string
  payment_method: string
  total_installments: string
  buyer_name: string
  buyer_email: string
  buyer_phone: string
  buyer_document: string
  buyer_state: string
}

export const perfectpayHeader: HeadersValues<PerfectpayHeaderValues> = {
  CódigoTransação: 'transaction_code',
  Status: 'transaction_status',
  DataVenda: 'transaction_date',
  Produtor: 'producer',
  Produto: 'product_name',
  Plano: 'offer_name',
  ValorVenda: 'purchase_value_without_tax',
  ValorComissão: 'my_commission_value',
  src: 'src_code',
  FormaPagamento: 'payment_method',
  Parcelas: 'total_installments',
  NomeCliente: 'buyer_name',
  EmailCliente: 'buyer_email',
  TelefoneCliente: 'buyer_phone',
  CPF: 'buyer_document',
  Estado: 'buyer_state'
}

export const perfectPayMissing = (row: Missing<PerfectpayHeaderValues>) => {
  return {
    ...row,
    product_id: genHash(row.product_name),
    offer_id: genHash(`${row.product_name} - ${row.offer_name}`),
    purchase_value_without_tax: parseFloatValue(row.purchase_value_without_tax),
    my_commission_value: parseFloatValue(row.my_commission_value),
    currency: 'BRL',
    purchase_value_with_tax: 'undefined',
    commission_currency: 'BRL',
    sck_code: 'undefined', // "Não fornecido pela plataforma."
    total_charges: 0, // "Não fornecido pela plataforma."
    coupon_code: 'undefined', // "Não fornecido pela plataforma."
    buyer_country: 'undefined', // "Não fornecido pela plataforma."
    buyer_instagram: 'undefined', // "Não fornecido pela plataforma."
    order_bump_transaction: 'undefined', // "Não fornecido pela plataforma."
    order_bump_type: '(none)' // "Não fornecido pela plataforma."
  }
}
