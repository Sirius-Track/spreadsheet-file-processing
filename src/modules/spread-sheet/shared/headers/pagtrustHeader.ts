import { genHash } from '../'
import { formatDate } from '../functions/formatDate'

import type { Missing } from '../types'
import type { HeadersValues } from './types'

export type PagtrustHeaderValues = {
  transaction_code: string
  transaction_status: string
  transaction_date: string
  product_name: string
  product_id: string
  offer_name: string
  currency: string
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
  buyer_state: string
}

export const pagtrustHeader: HeadersValues<PagtrustHeaderValues> = {
  Codigo_da_Venda: 'transaction_code',
  Status: 'transaction_status',
  Data: 'transaction_date',
  CodProduto: 'product_id',
  Produto: 'product_name',
  Oferta: 'offer_name',
  Moeda: 'currency',
  Valor_Liquido: 'purchase_value_with_tax',
  Preco_Base_do_Produto: 'purchase_value_without_tax',
  UtmCampaign: 'src_code',
  UtmMedium: 'sck_code',
  Pagamento: 'payment_method',
  Parcelas: 'total_installments',
  Comprador: 'buyer_name',
  Email: 'buyer_email',
  Celular: 'buyer_phone',
  CPF: 'buyer_document',
  Estado: 'buyer_state'
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

export const pagtrustMissing = (row: Missing<PagtrustHeaderValues>) => {
  return {
    ...row,
    transaction_date: changeDate(row.transaction_date), // Formato que vem 26/08/2025 23:47:44 -> mudar apra yyyy-mm-dd 
    offer_id: genHash(`${row.product_name} - ${row.offer_name}`), // genHash(product_name + offer)
    producer: 'undefined', // "Não fornecido pela plataforma."
    total_charges: 0, // "Não fornecido pela plataforma."
    buyer_country: 'undefined', // "Não fornecido pela plataforma."
    order_bump_type: '(none)', // "Não fornecido pela plataforma."
    order_bump_transaction: 'undefined' // "Não fornecido pela plataforma."
  }
}
