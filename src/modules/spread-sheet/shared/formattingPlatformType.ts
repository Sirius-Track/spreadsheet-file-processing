import { headerTreatment } from './headerTreatment'

import type { ParseResult } from 'papaparse'
import type { PlatformCustom, SpreadSheet } from '../types'

import { standardHeader, type StandardHeaderValues } from './headers/standardHeader'
import { hotmartHeader, type HotmartHeaderValues } from './headers/hotmartHeader'
import { herosparkHeader, type HerosparkHeaderValues, herosparkMissing } from './headers/herosparkHeader'
import { perfectpayHeader, type PerfectpayHeaderValues, perfectPayMissing } from './headers/perfectpayHeader'
import { kiwifyHeader, type KiwifyHeaderValues, kiwifyMissing } from './headers/kiwifyHeader'
import { eduzzHeader, type EduzzHeaderValues, eduzzMissing } from './headers/eduzzHeader'
import { greennHeader, type GreennHeaderValues, greennMissing } from './headers/greennHeader'
import { tmbHeader, type TmbHeaderValues, tmbMissing } from './headers/tmbHeader'
import { hublaHeader, type HublaHeaderValues, hublaMissing } from './headers/hublaHeader'
import { guruHeader, type GuruHeaderValues, guruMissing } from './headers/guruHeader'
import { tictoHeader, type TictoHeaderValues, tictoMissing } from './headers/tictoHeader'
import { voompHeader, type VoompHeaderValues, voompMissing } from './headers/voompHeader'
import { customHeader, customMissing } from './headers/customHeader'

import { HeadersValues } from './headers/types'

type Props = Omit<SpreadSheet, 'dataUrl'> & {
  custom: Partial<PlatformCustom>
  records: ParseResult<{
    [key: string]: string
  }>
}

export const formattingPlatformType = (remainderHeaderValues: Props) => {
  switch (remainderHeaderValues.platform) {
    case 'hotmart':
      return headerTreatment<typeof hotmartHeader, HotmartHeaderValues>({
        platformHeader: hotmartHeader,
        ...remainderHeaderValues
      })
    case 'standard':
      return headerTreatment<typeof standardHeader, StandardHeaderValues>({
        platformHeader: standardHeader,
        ...remainderHeaderValues
      })
    case 'perfectpay':
      return headerTreatment<typeof perfectpayHeader, PerfectpayHeaderValues>({
        headerMissing: perfectPayMissing,
        platformHeader: perfectpayHeader,
        ...remainderHeaderValues
      })
    case 'kiwify':
      return headerTreatment<typeof kiwifyHeader, KiwifyHeaderValues>({
        headerMissing: kiwifyMissing,
        platformHeader: kiwifyHeader,
        ...remainderHeaderValues
      })
    case 'eduzz':
      return headerTreatment<typeof eduzzHeader, EduzzHeaderValues>({
        headerMissing: eduzzMissing,
        platformHeader: eduzzHeader,
        ...remainderHeaderValues
      })
    case 'greenn':
      return headerTreatment<typeof greennHeader, GreennHeaderValues>({
        headerMissing: greennMissing,
        platformHeader: greennHeader,
        ...remainderHeaderValues
      })
    case 'tmb':
      return headerTreatment<typeof tmbHeader, TmbHeaderValues>({
        headerMissing: tmbMissing,
        platformHeader: tmbHeader,
        ...remainderHeaderValues
      })
    case 'hubla':
      return headerTreatment<typeof hublaHeader, HublaHeaderValues>({
        headerMissing: hublaMissing,
        platformHeader: hublaHeader,
        ...remainderHeaderValues
      })
    case 'guru':
      return headerTreatment<typeof guruHeader, GuruHeaderValues>({
        headerMissing: guruMissing,
        platformHeader: guruHeader,
        ...remainderHeaderValues
      })
    case 'herospark':
      return headerTreatment<typeof herosparkHeader, HerosparkHeaderValues>({
        headerMissing: herosparkMissing,
        platformHeader: herosparkHeader,
        ...remainderHeaderValues
      })
    case 'voompheader':
      return headerTreatment<typeof voompHeader, VoompHeaderValues>({
        headerMissing: voompMissing,
        platformHeader: voompHeader,
        ...remainderHeaderValues
      })
    case 'tictoo':
      return headerTreatment<typeof tictoHeader, TictoHeaderValues>({
        headerMissing: tictoMissing,
        platformHeader: tictoHeader,
        ...remainderHeaderValues
      })
    case 'custom':
      console.log('Dados custom recebidos:', remainderHeaderValues.custom)
      const transformedCustomHeader = customHeader(remainderHeaderValues.custom)
      console.log('Header custom transformado:', transformedCustomHeader)
      return headerTreatment<typeof transformedCustomHeader, PlatformCustom>({
        headerMissing: customMissing,
        platformHeader: transformedCustomHeader,
        ...remainderHeaderValues
      })
    default:
      throw new Error('Platform not found')
  }
}
