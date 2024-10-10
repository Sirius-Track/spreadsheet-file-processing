import { getFormatedValue } from '@/shared'
import { genHash } from '../functions/genHash'

import { PlatformCustom } from '../../types'
import { Missing } from '../types'

export const customMissing = (row: Missing<PlatformCustom>) => {
  return {
    ...row,
    transaction_code: row.maskTransactionCode || '',
    transaction_status: row.maskTransactionStatus || '',
    transaction_date: row.maskTransactionDate || '',
    producer: row.maskProducer || '',
    product_id: row.maskProductId || '',
    product_name: row.maskProductName || '',
    offer_id: row.maskOfferId || genHash(row.maskProductName),
    offer_name: row.maskOfferName || '',
    currency: row.maskCurrency || 'BRL',
    purchase_value_with_tax: row.maskPurchaseValueWithTax || '',
    purchase_value_without_tax: row.maskPurchaseValueWithoutTax || '',
    commission_currency: row.maskCommissionCurrency || '',
    my_commission_value: row.maskMyCommissionValue || '',
    src_code: row.maskSrcCode || '',
    sck_code: row.maskSckCode || '',
    payment_method: row.maskPaymentMethod || '',
    total_installments: row.maskTotalInstallments || '',
    total_charges: row.maskTotalCharges || '',
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
