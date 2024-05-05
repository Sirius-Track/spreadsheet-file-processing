export const headersHotmartFromCSV: { [key: string]: string } = {
  'Código da transação': 'transaction_code',
  'Status da transação': 'transaction_status',
  'Data da transação': 'transaction_date',
  'Produtor(a)': 'producer',
  'Código do produto': 'product_id',
  Produto: 'product_name',
  'Código do preço': 'offer_id',
  'Nome deste preço': 'offer_name',
  'Moeda de compra': 'currency',
  'Valor de compra com impostos': 'purchase_value_with_tax',
  'Valor de compra sem impostos': 'purchase_value_without_tax',
  'Moeda da comissão': 'commission_currency',
  'Minha comissão': 'my_commission_value',
  'Código SRC': 'src_code',
  'Código SCK': 'sck_code',
  'Método de pagamento': 'payment_method',
  'Quantidade total de parcelas': 'total_installments',
  'Quantidade de cobranças': 'total_charges',
  'Código de cupom': 'coupon_code',
  'Comprador(a)': 'buyer_name',
  'Email do(a) Comprador(a)': 'buyer_email',
  País: 'buyer_country',
  Telefone: 'buyer_phone',
  Documento: 'buyer_document',
  'Estado / Província': 'buyer_state',
  Instagram: 'buyer_instagram',
  'Tipo do order bump': 'order_bump_type',
  'Transação do ordem bump': 'order_bump_transaction'
}

export const headersKiwifyFromCSV: { [key: string]: string | null } = {
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

export const missingHeadersKiwify: { [key: string]: string | null } = {
  producer: null, // "Não fornecido pela plataforma."
  product_id: null, // genHash(product_name)
  offer_id: null, // genHash(product_name + offer)
  total_charges: null, // "Não fornecido pela plataforma."
  buyer_country: null, // "Não fornecido pela plataforma."
  order_bump_type: null, // "Não fornecido pela plataforma."
  order_bump_transaction: null // "Não fornecido pela plataforma."
}

export const headersEduzzFromCSV: { [key: string]: string | null } = {
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

export const missingHeadersEduzz: { [key: string]: string | null } = {
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

export const headersPerfectPayFromCSV: { [key: string]: string | null } = {
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

export const missingHeadersPerfectPay: { [key: string]: string } = {
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

export const headersGreennFromCSV: { [key: string]: string | null } = {
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

export const missingHeadersGreenn: { [key: string]: string | null } = {
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

export const headersTMBFromCSV: { [key: string]: string | null } = {
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

export const missingHeadersTMB: { [key: string]: string | null } = {
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

export const headersHublaFromCSV: { [key: string]: string | null } = {
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

export const missingHeadersHubla: { [key: string]: string | null } = {
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

export const headersGuruFromCSV: { [key: string]: string | null } = {
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

export const missingHeadersGuru: { [key: string]: string | null } = {
  producer: null, // "Não fornecido pela plataforma."
  offer_id: null, // genHash(product_name + offer)
  commission_currency: null, // "Não fornecido pela plataforma."
  my_commission_value: null, // "Não fornecido pela plataforma."
  total_charges: null, // "Não fornecido pela plataforma."
  buyer_instagram: null, // "Não fornecido pela plataforma."
  order_bump_type: null, // "Não fornecido pela plataforma."
  order_bump_transaction: null // "Não fornecido pela plataforma."
}

export const headersTictoFromCSV: { [key: string]: string | null } = {
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

export const missingHeadersTicto: { [key: string]: string | null } = {
  producer: null, // "Não fornecido pela plataforma."
  product_id: null, // genHash(product_name)
  currency: null,
  commission_currency: null, // "Não fornecido pela plataforma."
  total_charges: null, // "Não fornecido pela plataforma."
  buyer_instagram: null, // "Não fornecido pela plataforma."
  order_bump_type: null, // "Não fornecido pela plataforma."
  order_bump_transaction: null // "Não fornecido pela plataforma."
}
