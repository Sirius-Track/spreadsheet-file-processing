type PerfectpayHeaderValues = {
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

export const perfectpayHeader: { [key in string]: keyof PerfectpayHeaderValues } = {
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

export const perfectPayMissing: { [key: string]: string | undefined } = {
  product_id: undefined, // genHash(product_name)
  offer_id: undefined, // genHash(product_name + offer)
  currency: undefined,
  purchase_value_with_tax: undefined,
  commission_currency: undefined,
  sck_code: undefined, // "Não fornecido pela plataforma."
  total_charges: undefined, // "Não fornecido pela plataforma."
  coupon_code: undefined, // "Não fornecido pela plataforma."
  buyer_country: undefined, // "Não fornecido pela plataforma."
  buyer_instagram: undefined, // "Não fornecido pela plataforma."
  order_bump_transaction: undefined, // "Não fornecido pela plataforma."
  order_bump_type: undefined // "Não fornecido pela plataforma."
}
