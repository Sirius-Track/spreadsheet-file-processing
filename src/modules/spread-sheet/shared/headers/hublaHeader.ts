export const hublaHeader: { [key: string]: string | null } = {
  'ID da fatura': 'transaction_code',
  'Status da fatura': 'transaction_status',
  'Data de criação': 'transaction_date',
  'ID do produto': 'product_id',
  'Nome do produto': 'product_name',
  'Valor total': 'purchase_value_with_tax',
  'Valor do produto': 'purchase_value_without_tax',
  'Valor da sua comissão': 'my_commission_value',
  'UTM Origem': 'src_code',
  'Método de pagamento': 'payment_method',
  Parcelas: 'total_installments',
  'Cupom aplicado': 'coupon_code',
  'Nome do cliente': 'buyer_name',
  'Email do cliente': 'buyer_email',
  'Telefone do cliente': 'buyer_phone',
  'Documento do cliente': 'buyer_document'
}

export const hublaMissing: { [key: string]: string | null } = {
  producer: null, // "Não fornecido pela plataforma."
  offer_id: null, // genHash(product_name)
  offer_name: null, // genHash(product_name)
  currency: null,
  commission_currency: null,
  sck_code: null, // "Não fornecido pela plataforma."
  total_charges: null, // "Não fornecido pela plataforma."
  buyer_country: null, // "Não fornecido pela plataforma."
  buyer_state: null, // "Não fornecido pela plataforma."
  buyer_instagram: null, // "Não fornecido pela plataforma."
  order_bump_type: null, // "Não fornecido pela plataforma."
  order_bump_transaction: null // "Não fornecido pela plataforma."
}
