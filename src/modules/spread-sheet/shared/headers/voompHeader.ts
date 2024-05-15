import { genHash } from '../'

import type { Missing } from '../types'
import type { HeadersValues } from './types'

export type VoompHeaderValues = {
  transaction_code: string
  transaction_status: string
  transaction_date: string
  product_name: string
  purchase_value_with_tax: string
  purchase_value_without_tax: string
  payment_method: string
  buyer_name: string
  buyer_email: string
  buyer_phone: string
  buyer_document: string
  user_id: string
  project_id: string
  platform: string
}

export const voompHeader: HeadersValues<VoompHeaderValues> = {
  'Código da venda': 'transaction_code',
  'Status da venda': 'transaction_status',
  Data: 'transaction_date', // Data vem assim: 10/05/2024 20:37:46
  'Nome do produto': 'product_name',
  'Valor Líquido': 'purchase_value_with_tax', // Valor vem assim: 759,07
  'Valor Bruto': 'purchase_value_without_tax', // Valor vem assim: 759,07
  'Método de pagamento': 'payment_method',
  'Nome do cliente': 'buyer_name',
  'Email do cliente': 'buyer_email',
  Telefone: 'buyer_phone',
  Documento: 'buyer_document',
  'Código País': 'buyer_country',
  user_id: 'user_id',
  project_id: 'project_id',
  plataform: 'platform'
}

export const voompMissing = (row: Missing<VoompHeaderValues>) => {
  return {
    ...row,
    offer_id: genHash(row.product_name), // genHash(product_name)
    offer_name: genHash(row.product_name), // genHash(product_name)
    producer: 'undefined', // "Não fornecido pela plataforma."
    currency: 'BRL',
    commission_currency: 'BRL',
    src_code: 'undefined', // "Não fornecido pela plataforma."
    sck_code: 'undefined', // "Não fornecido pela plataforma."
    total_installments: 'undefined', // "Não fornecido pela plataforma."
    total_charges: 0, // "Não fornecido pela plataforma."
    buyer_state: 'undefined', // "Não fornecido pela plataforma."
    buyer_instagram: 'undefined', // "Não fornecido pela plataforma."
    order_bump_type: '(none)', // "Não fornecido pela plataforma."
    order_bump_transaction: 'undefined' // "Não fornecido pela plataforma."
  }
}
