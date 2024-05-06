import { HeadersValues } from './types'

export type PerfectpayHeaderValues = {
  transaction_code: string
  transaction_status: string
  transaction_date: string
  producer: string
  product_id: string
  product_name: string
  offer_id: string
  offer_name: string
  currency: string
  purchase_value_with_tax: string
  purchase_value_without_tax: string
  commission_currency: string
  my_commission_value: string
  src_code: string
  sck_code: string
  payment_method: string
  total_installments: string
  total_charges: string
  coupon_code: string
  buyer_name: string
  buyer_email: string
  buyer_country: string
  buyer_phone: string
  buyer_document: string
  buyer_state: string
  buyer_instagram: string
  order_bump_type: string
  order_bump_transaction: string
}

export const hotmartHeader: HeadersValues<PerfectpayHeaderValues> = {
  'Código da transação': 'transaction_code',
  'Status da transação': 'transaction_status',
  'Data da transação': 'transaction_date',
  'Produtor(a)': 'producer',
  'Código do produto': 'product_id',
  Produto: 'product_name',
  'Código do preço': 'offer_id',
  'Nome deste preço': 'offer_name',
  'Moeda de compra': 'currency',
  'Valor de compra com impostos': 'purchase_value_with_tax',
  'Valor de compra sem impostos': 'purchase_value_without_tax',
  'Moeda da comissão': 'commission_currency',
  'Minha comissão': 'my_commission_value',
  'Código SRC': 'src_code',
  'Código SCK': 'sck_code',
  'Método de pagamento': 'payment_method',
  'Quantidade total de parcelas': 'total_installments',
  'Quantidade de cobranças': 'total_charges',
  'Código de cupom': 'coupon_code',
  'Comprador(a)': 'buyer_name',
  'Email do(a) Comprador(a)': 'buyer_email',
  País: 'buyer_country',
  Telefone: 'buyer_phone',
  Documento: 'buyer_document',
  'Estado / Província': 'buyer_state',
  Instagram: 'buyer_instagram',
  'Tipo do order bump': 'order_bump_type',
  'Transação do ordem bump': 'order_bump_transaction'
}
