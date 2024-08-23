import { Missing } from '../types'
import { PlatformCustom } from '../../types'
import { getFormatedValue } from '../../../../shared'

export const customMissing = (row: Missing<PlatformCustom>) => {
  return {
    ...row,
    maskTransactionCode: '',
    maskTransactionStatus: '',
    maskTransactionDate: getFormatedValue({ isFormattedDate: true, value: row.maskTransactionDate }),
    maskProducer: '',
    maskProductId: '',
    maskProductName: '',
    maskOfferId: '',
    maskOfferName: '',
    maskCurrency: 'BRL',
    maskPurchaseValueWithTax: '',
    maskPurchaseValueWithoutTax: '',
    maskCommissionCurrency: '',
    maskMyCommissionValue: '',
    maskSrcCode: '',
    maskSckCode: '',
    maskPaymentMethod: '',
    maskTotalInstallments: '',
    maskTotalCharges: '',
    maskCouponCode: '',
    maskBuyerName: '',
    maskBuyerEmail: '',
    maskBuyerCountry: '',
    maskBuyerPhone: '',
    maskBuyerDocument: '',
    maskBuyerState: '',
    maskBuyerInstagram: '',
    maskOrderBumpType: '',
    maskOrderBumpTransaction: ''
  }
}
