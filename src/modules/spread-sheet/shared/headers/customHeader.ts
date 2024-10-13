import { getFormatedValue } from '@/shared'
import { genHash } from '../functions/genHash'
import { formatCurrency } from '../functions/formatCurrency'
import { formatDate } from '../functions/formatDate'

import { PlatformCustom } from '../../types'
import { Missing } from '../types'

export const customMissing = (row: Missing<PlatformCustom>) => {
  return {
    // ...row,
    transaction_code: row.maskTransactionCode || '',
    transaction_status: row.maskTransactionStatus || '',
    transaction_date: formatDate(row.maskTransactionDate) || '',
    producer: row.maskProducer || '',
    product_id: row.maskProductId || '',
    product_name: row.maskProductName || '',
    offer_id: row.maskOfferId || genHash(row.maskProductName),
    offer_name: row.maskOfferName || '',
    currency: row.maskCurrency || 'BRL',
    purchase_value_with_tax: formatCurrency(row.maskPurchaseValueWithTax) || '',
    purchase_value_without_tax: formatCurrency(row.maskPurchaseValueWithoutTax) || '',
    commission_currency: row.maskCommissionCurrency || '',
    my_commission_value: formatCurrency(row.maskMyCommissionValue) || '',
    src_code: row.maskSrcCode || '',
    sck_code: row.maskSckCode || '',
    payment_method: row.maskPaymentMethod || '',
    total_installments: row.maskTotalInstallments || '0',
    total_charges: row.maskTotalCharges || '0',
    coupon_code: row.maskCouponCode || '',
    buyer_name: row.maskBuyerName || '',
    buyer_email: row.maskBuyerEmail || '',
    buyer_country: row.maskBuyerCountry || '',
    buyer_phone: row.maskBuyerPhone || '',
    buyer_document: row.maskBuyerDocument || '',
    buyer_state: row.maskBuyerState || '',
    buyer_instagram: row.maskBuyerInstagram || '',
    order_bump_type: row.maskOrderBumpType || '',
    order_bump_transaction: row.maskOrderBumpTransaction || ''
  }
}
