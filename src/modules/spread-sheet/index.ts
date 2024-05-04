import Papa from 'papaparse'

import axios from 'axios'

import dayjs from 'dayjs'

import { SpreadSheetSchema } from './validation'

import type { SpreadSheet } from './types'

type RowData = {
  [key: string]: string
  user_id: string
  project_id: string
}

export const spreadSheed = async (data: SpreadSheet) => {
  const { dataUrl, userId, plataform, projectId } = SpreadSheetSchema.parse(data)

  const BATCH_SIZE = 2000
  const SUPABASE_URL = process.env.SUPABASE_URL

  const headersFromCSV = {
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
    'Comprador(a': 'buyer_name',
    'Email do(a) Comprador(a': 'buyer_email',
    País: 'buyer_country',
    Telefone: 'buyer_phone',
    Documento: 'buyer_document',
    'Estado / Província': 'buyer_state',
    Instagram: 'buyer_instagram',
    'Tipo do order bump': 'order_bump_type',
    'Transação do ordem bump': 'order_bump_transaction',
    user_id: 'user_id',
    project_id: 'project_id',
    hotmart: 'plataform',
    plataform: 'plataform',
    userId: 'user_id',
    projectId: 'project_id'
  }

  const fileCSV = await fetch(dataUrl)

  if (!fileCSV.ok) {
    throw new Error('File not found')
  }

  const csvText = await fileCSV.text()

  if (!csvText) {
    throw new Error('File is empty')
  }

  const records = Papa.parse<{ [key: string]: string }>(csvText, {
    header: true,
    skipEmptyLines: true
  })

  // Mantenha o cabeçalho para uso nas partes divididas
  const header = Object.keys(records.data[0])

  const formattedRows: Array<RowData> = records.data.map(row => {
    const formattedRow: RowData = {
      plataform,
      user_id: userId,
      project_id: projectId
    }

    const headersFromCSV: { [key: string]: string } = {
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
      'Comprador(a': 'buyer_name',
      'Email do(a) Comprador(a': 'buyer_email',
      País: 'buyer_country',
      Telefone: 'buyer_phone',
      Documento: 'buyer_document',
      'Estado / Província': 'buyer_state',
      Instagram: 'buyer_instagram',
      'Tipo do order bump': 'order_bump_type',
      'Transação do ordem bump': 'order_bump_transaction'
    }

    for (const [header, value] of Object.entries(row)) {
      const mappedHeader = headersFromCSV[header]

      const formattedValue = ['data da transação'].includes(mappedHeader.toLowerCase())
        ? dayjs(value).format('YYYY-MM-DD')
        : value.trim()

      if (mappedHeader) {
        formattedRow[mappedHeader] = formattedValue
      }
    }

    return formattedRow
  })

  console.log(formattedRows[0])

  // Remover os campos com nomes antigos
  const cleanedRows = formattedRows.map(row => {
    const cleanedRow: RowData = { ...row }

    for (const header of Object.keys(row)) {
      if (!headersFromCSV[header as keyof typeof headersFromCSV]) {
        delete cleanedRow[header]
      }
    }

    return cleanedRow
  })

  // Divida os registros em partes de tamanho fixo de 2mil e envie-os para a rota 'postCSV' do Supabase
  for (let i = 0; i < formattedRows.length; i += BATCH_SIZE) {
    const slice = formattedRows.slice(i, i + BATCH_SIZE)
    const csvChunk = JSON.stringify([header, ...slice.map(row => header.map(field => row[field]))])

    // chuck de envio
    await axios
      .post(`${SUPABASE_URL}/rest/v1/postCSV`, csvChunk, { headers: { 'Content-Type': 'text/csv' } })
      .catch(error => new Error(error))
  }
}
