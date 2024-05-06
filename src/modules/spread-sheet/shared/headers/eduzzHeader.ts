export const eduzzHeader: { [key: string]: string | null } = {
  Fatura: 'transaction_code',
  Status: 'transaction_status',
  'Data de Criação': 'transaction_date',
  'ID do Produto': 'product_id',
  Produto: 'product_name',
  'Nome da Oferta': 'offer_name',
  Moeda: 'currency',
  'Valor da Venda com Juros': 'purchase_value_with_tax',
  'Valor da Venda': 'purchase_value_without_tax',
  'Ganho Liquido': 'my_commission_value',
  'UTM Source': 'src_code',
  'Forma de Pagamento': 'payment_method',
  'Nº Parcelas': 'total_installments',
  Cupom: 'coupon_code',
  'Cliente / Nome': 'buyer_name',
  'Cliente / E-mail': 'buyer_email',
  'Cliente / Fones': 'buyer_phone',
  'Cliente / Documento': 'buyer_document',
  UF: 'buyer_state'
}

export const eduzzMissing: { [key: string]: string | null } = {
  producer: null, // "Não fornecido pela plataforma."
  offer_id: null, // genHash(product_name + offer)
  sck_code: null, // "Não fornecido pela plataforma."
  total_charges: null, // "Não fornecido pela plataforma."
  buyer_country: null, // "Não fornecido pela plataforma."
  buyer_instagram: null, // "Não fornecido pela plataforma."
  order_bump_type: null, // "Não fornecido pela plataforma."
  order_bump_transaction: null, // "Não fornecido pela plataforma."
  commission_currency: null //same as currency
}
