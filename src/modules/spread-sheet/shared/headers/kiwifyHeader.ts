export const kiwifyHeader: { [key: string]: string | null } = {
  'ID da venda': 'transaction_code',
  Status: 'transaction_status',
  'Data de Criação': 'transaction_date',
  Produto: 'product_name',
  Oferta: 'offer_name',
  Moeda: 'currency',
  'Total com acréscimo': 'purchase_value_with_tax',
  'Preço base do produto': 'purchase_value_without_tax',
  'Valor líquido': 'my_commission_value',
  'Tracking src': 'src_code',
  'Tracking sck': 'sck_code',
  Pagamento: 'payment_method',
  Parcelas: 'total_installments',
  'Coupon Code': 'coupon_code',
  Cliente: 'buyer_name',
  'Cliente Email': 'buyer_email',
  Celular: 'buyer_phone',
  CPF: 'buyer_document',
  Estado: 'buyer_state',
  instagram: 'buyer_instagram'
}

export const kiwifyMissing: { [key: string]: string | null } = {
  producer: null, // "Não fornecido pela plataforma."
  product_id: null, // genHash(product_name)
  offer_id: null, // genHash(product_name + offer)
  total_charges: null, // "Não fornecido pela plataforma."
  buyer_country: null, // "Não fornecido pela plataforma."
  order_bump_type: null, // "Não fornecido pela plataforma."
  order_bump_transaction: null // "Não fornecido pela plataforma."
}
