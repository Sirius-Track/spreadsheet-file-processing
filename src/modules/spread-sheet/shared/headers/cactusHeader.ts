import { genHash } from '../'
import { formatDate } from '../functions/formatDate'

import type { Missing } from '../types'
import type { HeadersValues } from './types'

export type CactusHeaderValues = {
  transaction_code: string
  transaction_status: string
  transaction_date: string
  product_name: string
  product_id: string
  offer_name: string
  offer_id: string
  purchase_value_with_tax: string
  purchase_value_without_tax: string
  src_code: string
  sck_code: string
  payment_method: string
  total_installments: string
  buyer_name: string
  buyer_email: string
  buyer_phone: string
  buyer_document: string
}

export const cactusHeader: HeadersValues<CactusHeaderValues> = {
  'ID da Venda': 'transaction_code', //ok
  'Status da Venda': 'transaction_status', //ok
  'Data da Venda': 'transaction_date', //ok
  Produto: 'product_name', //ok
  'Id da Oferta': 'offer_id', // ok
  Oferta: 'offer_name', //ok
  'Valor Pago pelo Cliente': 'purchase_value_with_tax', //ok
  'Valor Base do Produto': 'purchase_value_without_tax', //ok
  utm_source: 'src_code', //ok
  utm_campaign: 'sck_code', //ok
  'Método de Pagamento': 'payment_method', //ok
  Parcelas: 'total_installments', //ok
  'Nome do Cliente': 'buyer_name', //ok
  'Email do Cliente': 'buyer_email', //ok
  'Telefone do Cliente': 'buyer_phone', //ok
  'Número do Documento do Cliente': 'buyer_document' //ok
}

/**
 * Converts a date string from format "DD/MM/YYYY HH:MM:SS" to "YYYY-MM-DD"
 * @param dateString The date string to convert
 * @returns The formatted date string in YYYY-MM-DD format
 */
function changeDate(dateString: string): string {
  if (!dateString) return '';
  try {
    return formatDate(dateString);
  } catch (error) {
    console.error('Error formatting date:', dateString, error);
    return dateString;
  }
}

export const cactusMissing = (row: Missing<CactusHeaderValues>) => {
  return {
    ...row,
    product_id: genHash(row.product_name),
    transaction_date: changeDate(row.transaction_date), // Formato que vem 26/08/2025 23:47:44 -> mudar apra yyyy-mm-dd 
    producer: 'undefined', // "Não fornecido pela plataforma."
    total_charges: 0, // "Não fornecido pela plataforma."
    buyer_country: 'undefined', // "Não fornecido pela plataforma."
    order_bump_type: '(none)', // "Não fornecido pela plataforma."
    order_bump_transaction: 'undefined', // "Não fornecido pela plataforma."
    currency: 'BRL',
    buyer_state: 'undefined'
  }
}
