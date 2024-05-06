export const tictHeader: { [key: string]: string | null } = {
  'Código da Transação': 'transaction_code',
  Status: 'transaction_status',
  'Data do Pedido': 'transaction_date',
  'Nome do Produto': 'product_name',
  'Código da Oferta': 'offer_id',
  'Nome da Oferta': 'offer_name',
  'Valor do Pedido': 'purchase_value_with_tax',
  'Valor Pago': 'purchase_value_without_tax',
  'Comissão do Produtor': 'my_commission_value',
  src: 'src_code',
  sck: 'sck_code',
  'Método de Pagamento': 'payment_method',
  Parcelas: 'total_installments',
  Cupom: 'coupon_code',
  'Nome do Cliente': 'buyer_name',
  'E-mail do Cliente': 'buyer_email',
  País: 'buyer_country',
  'Telefone Completo do Cliente': 'buyer_phone',
  'Documento do Cliente': 'buyer_document',
  Estado: 'buyer_state'
}

export const tictMissing: { [key: string]: string | null } = {
  producer: null, // "Não fornecido pela plataforma."
  product_id: null, // genHash(product_name)
  currency: null,
  commission_currency: null, // "Não fornecido pela plataforma."
  total_charges: null, // "Não fornecido pela plataforma."
  buyer_instagram: null, // "Não fornecido pela plataforma."
  order_bump_type: null, // "Não fornecido pela plataforma."
  order_bump_transaction: null // "Não fornecido pela plataforma."
}
