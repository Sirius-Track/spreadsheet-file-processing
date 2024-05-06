import { genHash } from '../'

import type { Missing } from '../types'
import type { HeadersValues } from './types'

export type TictHeaderValues = {
  transaction_code: string
  transaction_status: string
  transaction_date: string
  product_name: string
  offer_id: string
  offer_name: string
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
  buyer_country: string
  buyer_phone: string
  buyer_document: string
  buyer_state: string
}

export const tictHeader: HeadersValues<TictHeaderValues> = {
  'Código da Transação': 'transaction_code',
  Status: 'transaction_status',
  'Data do Pedido': 'transaction_date',
  'Nome do Produto': 'product_name',
  'Código da Oferta': 'offer_id',
  'Nome da Oferta': 'offer_name',
  'Valor do Pedido': 'purchase_value_with_tax',
  'Valor Pago': 'purchase_value_without_tax',
  'Comissão do Produtor': 'my_commission_value',
  src: 'src_code',
  sck: 'sck_code',
  'Método de Pagamento': 'payment_method',
  Parcelas: 'total_installments',
  Cupom: 'coupon_code',
  'Nome do Cliente': 'buyer_name',
  'E-mail do Cliente': 'buyer_email',
  País: 'buyer_country',
  'Telefone Completo do Cliente': 'buyer_phone',
  'Documento do Cliente': 'buyer_document',
  Estado: 'buyer_state'
}

export const tictMissing = (row: Missing<TictHeaderValues>) => {
  return {
    ...row,
    product_id: genHash(row.product_name), // genHash(product_name)
    producer: 'undefined', // "Não fornecido pela plataforma."
    currency: 'undefined',
    commission_currency: 'undefined', // "Não fornecido pela plataforma."
    total_charges: 'undefined', // "Não fornecido pela plataforma."
    buyer_instagram: 'undefined', // "Não fornecido pela plataforma."
    order_bump_type: 'undefined', // "Não fornecido pela plataforma."
    order_bump_transaction: 'undefined' // "Não fornecido pela plataforma."
  }
}
