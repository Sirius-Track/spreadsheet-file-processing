import { HeadersValues } from './types'

export type HotmartSpanishHeaderValues = {
  transaction_code: string
  transaction_status: string
  transaction_date: string
  //producer: string
  product_id: string
  product_name: string
  offer_id: string
  offer_name: string
  currency: string
  //purchase_value_with_tax: string
  purchase_value_without_tax: string
  //commission_currency?: string
  //my_commission_value?: string
  //src_code: string
  //sck_code: string
  payment_method: string
  total_installments: string
  total_charges: string
  //coupon_code?: string
  buyer_name: string
  buyer_email: string
  buyer_country?: string
  buyer_phone: string
  buyer_document: string
  //buyer_state: string
  //buyer_instagram?: string
  order_bump_type: string
  order_bump_transaction: string
}

export const hotmartSpanishHeader: HeadersValues<HotmartSpanishHeaderValues> = {
    'Código de la transacción': 'transaction_code',
    'Estatus de la transacción': 'transaction_status',
    'Fecha de la transacción': 'transaction_date',
    'Código del producto': 'product_id',
    'Producto': 'product_name',
    'Código del precio': 'offer_id',
    'Nombre de este precio': 'offer_name',
    'Moneda de compra': 'currency',
    'Valor de compra sin impuestos': 'purchase_value_without_tax',
    'Método de pago': 'payment_method',
    'Cantidad total de cuotas': 'total_installments',
    'Cantidad de cobros': 'total_charges',
    'Comprador(a)': 'buyer_name',
    'Email del Comprador(a)': 'buyer_email',
    'País': 'buyer_country',
    'Teléfono': 'buyer_phone',
    'Documento': 'buyer_document',
    'Tipo de order bump': 'order_bump_type',
    'Transacción del ordem bump': 'order_bump_transaction'
  }