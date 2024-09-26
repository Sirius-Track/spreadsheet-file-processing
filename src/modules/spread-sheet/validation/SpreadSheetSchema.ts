import * as z from 'zod'

export const platforms = [
  'hotmart',
  'kiwify',
  'eduzz',
  'herospark',
  'perfectpay',
  'greenn',
  'tmb',
  'hubla',
  'guru',
  'voompheader',
  'tictoo',
  'custom'
] as const

export const SpreadSheetSchema = z.object({
  dataUrl: z.string(),
  platform: z.custom(value => {
    if (!platforms.includes(value)) {
      throw new Error(`Invalid platform: ${value}, must be one of ${platforms.join(', ')}`)
    }

    return value
  }),
  userId: z.string(),
  projectId: z.string(),
  maskTransactionCode: z.string().nullable(),
  maskTransactionStatus: z.string().nullable(),
  maskTransactionDate: z.string().nullable(),
  maskProducer: z.string().nullable(),
  maskProductId: z.string().nullable(),
  maskProductName: z.string().nullable(),
  maskOfferId: z.string().nullable(),
  maskOfferName: z.string().nullable(),
  maskCurrency: z.string().nullable(),
  maskPurchaseValueWithTax: z.string().nullable(),
  maskPurchaseValueWithoutTax: z.string().nullable(),
  maskCommissionCurrency: z.string().nullable(),
  maskMyCommissionValue: z.string().nullable(),
  maskSrcCode: z.string().nullable(),
  maskSckCode: z.string().nullable(),
  maskPaymentMethod: z.string().nullable(),
  maskTotalInstallments: z.string().nullable(),
  maskTotalCharges: z.string().nullable(),
  maskCouponCode: z.string().nullable(),
  maskBuyerName: z.string().nullable(),
  maskBuyerEmail: z.string().nullable(),
  maskBuyerCountry: z.string().nullable(),
  maskBuyerPhone: z.string().nullable(),
  maskBuyerDocument: z.string().nullable(),
  maskBuyerState: z.string().nullable(),
  maskBuyerInstagram: z.string().nullable(),
  maskOrderBumpType: z.string().nullable(),
  maskOrderBumpTransaction: z.string().nullable()
})

export type SpreadSheetInput = z.infer<typeof SpreadSheetSchema>
