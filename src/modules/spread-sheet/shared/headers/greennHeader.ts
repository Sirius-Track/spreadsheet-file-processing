export const greennHeader: { [key: string]: string | null } = {
  'Código da venda': 'transaction_code',
  'Status da venda': 'transaction_status',
  Data: 'transaction_date',
  'Nome do produto': 'product_name',
  'Código da Oferta': 'offer_id',
  'Nome da Oferta': 'offer_name',
  'Valor Líquido': 'purchase_value_with_tax',
  'Valor Bruto': 'purchase_value_without_tax',
  'Método de pagamento': 'payment_method',
  'Parcelas contrato assinatura': 'total_installments',
  'Nome do cliente': 'buyer_name',
  'Email do cliente': 'buyer_email',
  'Código País': 'buyer_country',
  Telefone: 'buyer_phone',
  Documento: 'buyer_document',
  'Estado do cliente': 'buyer_state'
}

export const greennMissing: { [key: string]: string | null } = {
  producer: null, // "Não fornecido pela plataforma."
  product_id: null, // genHash(product_name)
  currency: null,
  commission_currency: null,
  my_commission_value: null,
  src_code: null, // "Não fornecido pela plataforma."
  sck_code: null, // "Não fornecido pela plataforma."
  total_charges: null, // "Não fornecido pela plataforma."
  coupon_code: null, // "Não fornecido pela plataforma."
  buyer_instagram: null, // "Não fornecido pela plataforma."
  order_bump_type: null, // "Não fornecido pela plataforma."
  order_bump_transaction: null // "Não fornecido pela plataforma."
}
