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
  maskTransactionCode: z.string().optional().nullable(),
  maskTransactionStatus: z.string().optional().nullable(),
  maskTransactionDate: z.string().optional().nullable(),
  maskProducer: z.string().optional().nullable(),
  maskProductId: z.string().optional().nullable(),
  maskProductName: z.string().optional().nullable(),
  maskOfferId: z.string().optional().nullable(),
  maskOfferName: z.string().optional().nullable(),
  maskCurrency: z.string().optional().nullable(),
  maskPurchaseValueWithTax: z.string().optional().nullable(),
  maskPurchaseValueWithoutTax: z.string().optional().nullable(),
  maskCommissionCurrency: z.string().optional().nullable(),
  maskMyCommissionValue: z.string().optional().nullable(),
  maskSrcCode: z.string().optional().nullable(),
  maskSckCode: z.string().optional().nullable(),
  maskPaymentMethod: z.string().optional().nullable(),
  maskTotalInstallments: z.string().optional().nullable(),
  maskTotalCharges: z.string().optional().nullable(),
  maskCouponCode: z.string().optional().nullable(),
  maskBuyerName: z.string().optional().nullable(),
  maskBuyerEmail: z.string().optional().nullable(),
  maskBuyerCountry: z.string().optional().nullable(),
  maskBuyerPhone: z.string().optional().nullable(),
  maskBuyerDocument: z.string().optional().nullable(),
  maskBuyerState: z.string().optional().nullable(),
  maskBuyerInstagram: z.string().optional().nullable(),
  maskOrderBumpType: z.string().optional().nullable(),
  maskOrderBumpTransaction: z.string().optional().nullable()
})

export type SpreadSheetInput = z.infer<typeof SpreadSheetSchema>
