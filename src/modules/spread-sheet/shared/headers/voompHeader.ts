import { genHash } from '../'

import type { Missing } from '../types'
import type { HeadersValues } from './types'

export type VoompHeaderValues = {
  transaction_code: string
  transaction_status: string
  transaction_date: string
  product_id: string
  product_name: string
  offer_id: string
  offer_name: string
  purchase_value_with_tax: string
  purchase_value_without_tax: string
  payment_method: string
  buyer_name: string
  buyer_country: string
  buyer_email: string
  buyer_phone: string
  buyer_document: string
  buyer_state: string
  buyer_address: string
  user_id: string
  project_id: string
  platform: string
}

export const voompHeader: HeadersValues<VoompHeaderValues> = {
  'ID Venda': 'transaction_code',
  'Status da venda': 'transaction_status',
  'Data da venda': 'transaction_date',
  'ID Produto': 'product_id',
  'Nome do produto': 'product_name',
  'ID Oferta': 'offer_id',
  'Nome da oferta': 'offer_name',
  'Valor Pago': 'purchase_value_with_tax',
  'Valor Bruto': 'purchase_value_without_tax',
  'Método de pagamento': 'payment_method',
  'Nome do comprador': 'buyer_name',
  'Email do comprador': 'buyer_email',
  'Número de telefone': 'buyer_phone',
  'CPF/CNPJ': 'buyer_document',
  'UF Origem': 'buyer_state',
  'Endereço físico': 'buyer_address',
  user_id: 'user_id',
  project_id: 'project_id',
  plataform: 'platform'
}

export const voompMissing = (row: Missing<VoompHeaderValues>) => {
  return {
    ...row,
    producer: 'undefined', // "Não fornecido pela plataforma."
    currency: 'BRL',
    purchase_value_with_tax: row.purchase_value_with_tax.replace(',', '.'),
    purchase_value_without_tax: row.purchase_value_without_tax.replace(',', '.'),
    commission_currency: 'BRL',
    src_code: 'undefined', // "Não fornecido pela plataforma."
    sck_code: 'undefined', // "Não fornecido pela plataforma."
    total_installments: 'undefined', // "Não fornecido pela plataforma."
    total_charges: 0, // "Não fornecido pela plataforma."
    buyer_instagram: 'undefined', // "Não fornecido pela plataforma."
    order_bump_type: '(none)', // "Não fornecido pela plataforma."
    order_bump_transaction: 'undefined' // "Não fornecido pela plataforma."
  }
}
