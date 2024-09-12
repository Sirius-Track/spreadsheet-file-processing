import * as z from 'zod'

export const platforms = [
  'custom',
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
  maskTransactionCode: z.string().optional(),
  maskTransactionStatus: z.string().optional(),
  maskTransactionDate: z.string().optional(),
  maskProducer: z.string().optional(),
  maskProductId: z.string().optional(),
  maskProductName: z.string().optional(),
  maskOfferId: z.string().optional(),
  maskOfferName: z.string().optional(),
  maskCurrency: z.string().optional(),
  maskPurchaseValueWithTax: z.string().optional(),
  maskPurchaseValueWithoutTax: z.string().optional(),
  maskCommissionCurrency: z.string().optional(),
  maskMyCommissionValue: z.string().optional(),
  maskSrcCode: z.string().optional(),
  maskSckCode: z.string().optional(),
  maskPaymentMethod: z.string().optional(),
  maskTotalInstallments: z.string().optional(),
  maskTotalCharges: z.string().optional(),
  maskCouponCode: z.string().optional(),
  maskBuyerName: z.string().optional(),
  maskBuyerEmail: z.string().optional(),
  maskBuyerCountry: z.string().optional(),
  maskBuyerPhone: z.string().optional(),
  maskBuyerDocument: z.string().optional(),
  maskBuyerState: z.string().optional(),
  maskBuyerInstagram: z.string().optional(),
  maskOrderBumpType: z.string().optional(),
  maskOrderBumpTransaction: z.string().optional()
})

export type SpreadSheetInput = z.infer<typeof SpreadSheetSchema>
