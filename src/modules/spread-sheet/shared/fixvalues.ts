function formatEntry(entry: {
  transaction_code: string
  transaction_status: string
  transaction_date: string
  producer: string
  product_id: string
  product_name: string
  offer_id: string
  offer_name: string
  currency: string
  purchase_value_with_tax: string | number
  purchase_value_without_tax: string | number
  commission_currency: string
  my_commission_value: string | number
  src_code: string
  sck_code: string
  payment_method: string
  total_installments: string | number
  total_charges: string | number
  coupon_code: string
  buyer_name: string
  buyer_email: string
  buyer_country: string
  buyer_phone: string
  buyer_document: string
  buyer_state: string
  buyer_instagram: string
  order_bump_type: string
  order_bump_transaction: string
}): void {
  function parseFloatValue(value: string | number): number {
    if (typeof value === 'number') return value
    return parseFloat(value.replace(/,/g, '').replace(/\./g, '.').replace(',', '.'))
  }

  function parseIntegerValue(value: string | number): number {
    if (typeof value === 'number') return value
    return parseInt(value.replace(/\D/g, ''))
  }

  function parseDateValue(value: string): string {
    return new Date(value).toISOString().slice(0, 10)
  }

  entry.purchase_value_with_tax = parseFloatValue(entry.purchase_value_with_tax).toFixed(2)
  entry.purchase_value_without_tax = parseFloatValue(entry.purchase_value_without_tax).toFixed(2)
  entry.my_commission_value = parseFloatValue(entry.my_commission_value).toFixed(2)
  entry.total_installments = parseIntegerValue(entry.total_installments)
  entry.total_charges = parseIntegerValue(entry.total_charges)
  entry.transaction_date = parseDateValue(entry.transaction_date)
}

// Example Usage
const entry = {
  transaction_code: '12345',
  transaction_status: 'completed',
  transaction_date: '2024-05-05',
  producer: 'John Doe',
  product_id: '67890',
  product_name: 'Widget',
  offer_id: '54321',
  offer_name: 'Special Deal',
  currency: 'USD',
  purchase_value_with_tax: '1,000.00',
  purchase_value_without_tax: '900.00',
  commission_currency: 'USD',
  my_commission_value: '100.00',
  src_code: 'SRC123',
  sck_code: 'SCK123',
  payment_method: 'credit_card',
  total_installments: '3',
  total_charges: '3',
  coupon_code: 'DISCOUNT',
  buyer_name: 'Jane Smith',
  buyer_email: 'jane@example.com',
  buyer_country: 'USA',
  buyer_phone: '123-456-7890',
  buyer_document: '123-45-6789',
  buyer_state: 'NY',
  buyer_instagram: '@janesmith',
  order_bump_type: 'none',
  order_bump_transaction: '0'
}

formatEntry(entry)
console.log(entry)
