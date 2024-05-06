export const perfectpayHeader: { [key: string]: string | null } = {
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
  Estado: 'buyer_state',
  un: 'order_bump_type'
}

export const perfectPayMissing: { [key: string]: string } = {
  product_id: null, // genHash(product_name)
  offer_id: null, // genHash(product_name + offer)
  currency: null,
  purchase_value_with_tax: null,
  commission_currency: null,
  sck_code: null, // "Não fornecido pela plataforma."
  total_charges: null, // "Não fornecido pela plataforma."
  coupon_code: null, // "Não fornecido pela plataforma."
  buyer_country: null, // "Não fornecido pela plataforma."
  buyer_instagram: null, // "Não fornecido pela plataforma."
  order_bump_transaction: null // "Não fornecido pela plataforma."
}
