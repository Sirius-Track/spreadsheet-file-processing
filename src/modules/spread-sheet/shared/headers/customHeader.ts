import { getFormatedValue } from '@/shared'
import { genHash } from '../functions/genHash'

import { PlatformCustom } from '../../types'
import { Missing } from '../types'
import { HeadersValues } from './types'

export const customHeader = (custom: Partial<PlatformCustom>) =>
  Object.keys(custom).reduce<HeadersValues<PlatformCustom>>((acc, key) => {
    const value = custom[key as keyof PlatformCustom]
    acc[key as keyof PlatformCustom] = value !== undefined ? value : ('' as any)

    return acc
  }, {})

export const customMissing = (row: Missing<PlatformCustom>) => {
  return {
    ...row,
    maskTransactionCode: row.maskTransactionCode || '',
    maskTransactionStatus: row.maskTransactionStatus || '',
    maskTransactionDate: getFormatedValue({ isFormattedDate: true, value: row.maskTransactionDate }),
    maskProducer: row.maskProducer || '',
    maskProductId: row.maskProductId || '',
    maskProductName: row.maskProductName || '',
    maskOfferId: row.maskOfferId || genHash(row.maskProductName),
    maskOfferName: row.maskOfferName || '',
    maskCurrency: row.maskCurrency || 'BRL',
    maskPurchaseValueWithTax: row.maskPurchaseValueWithTax || '',
    maskPurchaseValueWithoutTax: row.maskPurchaseValueWithoutTax || '',
    maskCommissionCurrency: row.maskCommissionCurrency || '',
    maskMyCommissionValue: row.maskMyCommissionValue || '',
    maskSrcCode: row.maskSrcCode || '',
    maskSckCode: row.maskSckCode || '',
    maskPaymentMethod: row.maskPaymentMethod || '',
    maskTotalInstallments: row.maskTotalInstallments || '',
    maskTotalCharges: row.maskTotalCharges || '',
    maskCouponCode: row.maskCouponCode || '',
    maskBuyerName: row.maskBuyerName || '',
    maskBuyerEmail: row.maskBuyerEmail || '',
    maskBuyerCountry: row.maskBuyerCountry || '',
    maskBuyerPhone: row.maskBuyerPhone || '',
    maskBuyerDocument: row.maskBuyerDocument || '',
    maskBuyerState: row.maskBuyerState || '',
    maskBuyerInstagram: row.maskBuyerInstagram || '',
    maskOrderBumpType: row.maskOrderBumpType || '',
    maskOrderBumpTransaction: row.maskOrderBumpTransaction || ''
  }
}
