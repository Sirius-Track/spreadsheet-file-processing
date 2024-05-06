export const tmbHeader: { [key: string]: string | null } = {
  Pedido: 'transaction_code',
  Status: 'transaction_status',
  'Criado Em': 'transaction_date',
  Produtor: 'producer',
  Produto: 'product_name',
  'Ticket (R$)': 'purchase_value_without_tax',
  utm_source: 'src_code',
  'Modalidade de Contrato': 'payment_method',
  'Cliente Nome': 'buyer_name',
  'Cliente Email': 'buyer_email',
  País: 'buyer_country',
  Telefone: 'buyer_phone',
  'Cliente CPF': 'buyer_document',
  Estado: 'buyer_state'
}

export const tmbMissing: { [key: string]: string | null } = {
  product_id: null, // genHash(product_name)
  offer_id: null, // genHash(product_name)
  offer_name: null, // genHash(product_name)
  currency: null,
  purchase_value_with_tax: null,
  commission_currency: null, // "Não fornecido pela plataforma."
  my_commission_value: null, // "Não fornecido pela plataforma."
  sck_code: null, // "Não fornecido pela plataforma."
  total_installments: null, // "Não fornecido pela plataforma."
  total_charges: null, // "Não fornecido pela plataforma."
  coupon_code: null, // "Não fornecido pela plataforma."
  buyer_instagram: null, // "Não fornecido pela plataforma."
  order_bump_type: null, // "Não fornecido pela plataforma."
  order_bump_transaction: null // "Não fornecido pela plataforma."
}
