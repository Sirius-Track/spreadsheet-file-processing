import { platforms } from './validation/SpreadSheetSchema'

export type SpreadSheet = {
  dataUrl: string
  platform: (typeof platforms)[number]
  userId: string
  projectId: string
  maskTransactionCode?: string
  maskTransactionStatus?: string
  maskTransactionDate?: string
  maskProducer?: string
  maskProductId?: string
  maskProductName?: string
  maskOfferId?: string
  maskOfferName?: string
  maskCurrency?: string
  maskPurchaseValueWithTax?: string
  maskPurchaseValueWithoutTax?: string
  maskCommissionCurrency?: string
  maskMyCommissionValue?: string
  maskSrcCode?: string
  maskSckCode?: string
  maskPaymentMethod?: string
  maskTotalInstallments?: string
  maskTotalCharges?: string
  maskCouponCode?: string
  maskBuyerName?: string
  maskBuyerEmail?: string
  maskBuyerCountry?: string
  maskBuyerPhone?: string
  maskBuyerDocument?: string
  maskBuyerState?: string
  maskBuyerInstagram?: string
  maskOrderBumpType?: string
  maskOrderBumpTransaction?: string
}

export type Row = Pick<SpreadSheet, 'platform'> & {
  user_id: string
  project_id: string
}

export type RowData = Row & {
  [key: string]: string
}
