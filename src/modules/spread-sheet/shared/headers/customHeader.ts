import { getFormatedValue } from '@/shared'
import { genHash } from '../functions/genHash'
import { formatCurrency } from '../functions/formatCurrency'
import { formatDate } from '../functions/formatDate'
import { formatPhone } from '../functions/formatPhone'

import { PlatformCustom } from '../../types'
import { Missing } from '../types'

function safeString(value: any): string {
  return value === undefined || value === null ? '' : String(value)
}

export const customMissing = (row: Missing<PlatformCustom>) => {
  return {
    //...row,
    user_id: row.user_id || '', //mand
    project_id: row.project_id || '', //mand
    platform: row.platform || '', //mand
    transaction_status: row.maskTransactionStatus || '', //mand
    transaction_date: formatDate(row.maskTransactionDate) || '', //mand
    product_name: row.maskProductName || '', //mand
    currency: row.maskCurrency || 'BRL', //mand
    purchase_value_without_tax: formatCurrency(row.maskPurchaseValueWithoutTax) || '', //mand
    buyer_name: row.maskBuyerName || '', //mand
    buyer_phone: formatPhone(row.maskBuyerPhone) || '', //mand
    buyer_email:
      row.maskBuyerEmail ||
      genHash(
        `${safeString(formatDate(row.maskTransactionDate))}
      ${safeString(row.platform)}
      ${safeString(row.maskCurrency)}
      ${safeString(row.maskBuyerName)}
      ${safeString(row.maskBuyerEmail)}
      ${safeString(row.maskBuyerDocument)}
      ${safeString(row.maskProductId)}
      ${safeString(row.maskProductName)}
      ${safeString(row.maskOfferId)}
      ${safeString(row.maskOfferName)}
      ${safeString(row.maskPurchaseValueWithoutTax)}`
      ) + '@emailgerado.com', //mand
    buyer_document: row.maskBuyerDocument || '', //mand
    transaction_code:
      row.maskTransactionCode ||
      genHash(
        `${safeString(formatDate(row.maskTransactionDate))}
        ${safeString(row.platform)}
        ${safeString(row.maskCurrency)}
        ${safeString(row.maskBuyerName)}
        ${safeString(row.maskBuyerEmail)}
        ${safeString(row.maskBuyerDocument)}
        ${safeString(row.maskProductId)}
        ${safeString(row.maskProductName)}
        ${safeString(row.maskOfferId)}
        ${safeString(row.maskOfferName)}
        ${safeString(row.maskPurchaseValueWithoutTax)}
        `
      ), //mand
    product_id: row.maskProductId || genHash(` ${row.maskProductName}`) || '', //mand
    offer_id:
      row.maskOfferId ||
      genHash(`
      ${safeString(row.maskProductName)}
      ${safeString(row.maskProductId)}
      ${safeString(row.maskPurchaseValueWithoutTax)}
      `), //mand
    offer_name:
      row.maskOfferName ||
      ' ' +
        genHash(`
      ${row.maskProductName}
      ${row.maskProductId}
      ${row.maskPurchaseValueWithoutTax}
      `) +
        row.maskPurchaseValueWithoutTax, //mand
    buyer_country: row.maskBuyerCountry || '', //mand
    order_bump_type: row.maskOrderBumpType || '', //optional
    order_bump_transaction: row.maskOrderBumpTransaction || '', //optional
    producer: row.maskProducer || '', //optional
    purchase_value_with_tax: formatCurrency(row.maskPurchaseValueWithTax) || '', //optional
    commission_currency: row.maskCommissionCurrency || '', //optional
    my_commission_value: formatCurrency(row.maskMyCommissionValue) || '', //optional
    src_code: row.maskSrcCode || '', //optional
    sck_code: row.maskSckCode || '', //optional
    payment_method: row.maskPaymentMethod || '', //optional
    total_installments: row.maskTotalInstallments || '0', //optional
    total_charges: row.maskTotalCharges || '0', //optional
    coupon_code: row.maskCouponCode || '', //optional
    buyer_state: row.maskBuyerState || '', //optional
    buyer_instagram: row.maskBuyerInstagram || '' //optional
  }
}
