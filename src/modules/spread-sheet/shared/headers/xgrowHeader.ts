import { genHash } from '../'

import type { Missing } from '../types'
import type { HeadersValues } from './types'

export type XgrowHeaderValues = {
  transaction_code: string
  transaction_status: string
  transaction_date: string
  product_name: string
  purchase_value_with_tax: string
  purchase_value_without_tax: string
  my_commission_value: string
  src_code: string
  payment_method: string
  total_installments: string
  coupon_code: string
  buyer_name: string
  buyer_email: string
  buyer_phone: string
  buyer_document: string
  offer_name: string
  buyer_country: string
}

export const xgrowHeader: HeadersValues<XgrowHeaderValues> = {
  Transação: 'transaction_code',
  Status: 'transaction_status',
  'Dt. Pagamento': 'transaction_date',
  Produto: 'product_name',
  'Valor líquido': 'purchase_value_with_tax',
  'Valor Produto': 'purchase_value_without_tax',
  'Minha Comissão': 'my_commission_value',
  'UTM Source': 'src_code',
  'Método pgto.': 'payment_method',
  'Nº parcelas': 'total_installments',
  'Cupom': 'coupon_code',
  Aluno: 'buyer_name',
  'E-mail': 'buyer_email',
  'Telefone': 'buyer_phone',
  'Nº do Documento': 'buyer_document',
  Plano: 'offer_name',
  País: 'buyer_country'
}

export const xgrowMissing = (row: Missing<XgrowHeaderValues>) => {
  return {
    ...row,
    offer_id: genHash(`${row.product_name} - ${row.offer_name}`), // genHash(product_name)
    product_id: genHash(row.product_name),
    producer: 'undefined', // "Não fornecido pela plataforma."
    currency: 'BRL',
    commission_currency: 'BRL',
    sck_code: 'undefined', // "Não fornecido pela plataforma."
    total_charges: 0, // "Não fornecido pela plataforma."
    buyer_country: 'BRA', // "Não fornecido pela plataforma."
    buyer_state: 'undefined', // "Não fornecido pela plataforma."
    buyer_instagram: 'undefined', // "Não fornecido pela plataforma."
    order_bump_type: '(none)', // "Não fornecido pela plataforma."
    order_bump_transaction: 'undefined' // "Não fornecido pela plataforma."
  }
}


/*
Pedido
Produto
Plano
Tipo de pagamento
Aluno
E-mail
Nº parcelas

Dt. Adesão

Dt. Cancelamento
Método pgto.
Cupom
Valor Cupom
Valor Produto
Taxa Xgrow
Valor líquido
Minha Comissão
Comissão de Coprodução
Comissão de Afiliado
Nome do Afiliado
Documento
Nº do Documento
Telefone
CEP
Rua
Número
Complemento
Bairro
Cidade
Estado
País

Tipo de Teste
Duração Período de Teste
Dt. Confirmação
*/