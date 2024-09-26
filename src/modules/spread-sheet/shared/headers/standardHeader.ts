import { HeadersValues } from './types'

export type StandardHeaderValues = {
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

export const standardHeader: HeadersValues<StandardHeaderValues> = {
  Transacao: 'transaction_code',
  Status: 'transaction_status',
  DataDaCompra: 'transaction_date',
  Produtor: 'producer',
  CodigoDoProduto: 'product_id',
  NomeDoProduto: 'product_name',
  CodigoDaOferta: 'offer_id',
  NomeDaOferta: 'offer_name',
  Moeda: 'currency',
  ValorDaCompraComTax: 'purchase_value_with_tax',
  TicketDoProduto: 'purchase_value_without_tax',
  MoedaDaComissao: 'commission_currency',
  ValorDaComissao: 'my_commission_value',
  TrackCodigoSrc: 'src_code',
  TrackCodigoSck: 'sck_code',
  FormaDePagamento: 'payment_method',
  TotalDeParcelas: 'total_installments',
  TotalDeCobranças: 'total_charges',
  CodigoDeCupom: 'coupon_code',
  Comprador: 'buyer_name',
  EmailDoComprador: 'buyer_email',
  Pais: 'buyer_country',
  Telefone: 'buyer_phone',
  Documento: 'buyer_document',
  Estado: 'buyer_state',
  Instagram: 'buyer_instagram',
  TipoDoOrderBump: 'order_bump_type',
  TransacaoDoOrderBump: 'order_bump_transaction'
}
