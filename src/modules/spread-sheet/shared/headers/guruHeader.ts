export const guruHeader: { [key: string]: string | null } = {
  'id transação': 'transaction_code',
  status: 'transaction_status',
  'data pedido': 'transaction_date',
  'id produto': 'product_id',
  'nome produto': 'product_name',
  'nome oferta': 'offer_name',
  moeda: 'currency',
  'valor líquido': 'purchase_value_with_tax',
  'valor venda': 'purchase_value_without_tax',
  'origem rppc venda': 'src_code',
  'rppc checkout': 'sck_code',
  pagamento: 'payment_method',
  parcelas: 'total_installments',
  'cupom código': 'coupon_code',
  'nome contato': 'buyer_name',
  'email contato': 'buyer_email',
  'país contato': 'buyer_country',
  'codigo telefone contato + telefone contato': 'buyer_phone',
  'doc contato': 'buyer_document',
  'estado contato': 'buyer_state'
}

export const guruMissing: { [key: string]: string | null } = {
  producer: null, // "Não fornecido pela plataforma."
  offer_id: null, // genHash(product_name + offer)
  commission_currency: null, // "Não fornecido pela plataforma."
  my_commission_value: null, // "Não fornecido pela plataforma."
  total_charges: null, // "Não fornecido pela plataforma."
  buyer_instagram: null, // "Não fornecido pela plataforma."
  order_bump_type: null, // "Não fornecido pela plataforma."
  order_bump_transaction: null // "Não fornecido pela plataforma."
}
