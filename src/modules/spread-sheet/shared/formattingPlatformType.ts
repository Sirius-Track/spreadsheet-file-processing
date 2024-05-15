import { headerTreatment } from './headerTreatment'

import type { ParseResult } from 'papaparse'
import type { SpreadSheet } from '../types'

import { hotmartHeader, HotmartHeaderValues } from './headers/hotmartHeader'
import { herosparkHeader, HerosparkHeaderValues, herosparkMissing } from './headers/herosparkHeader'
import { perfectpayHeader, PerfectpayHeaderValues, perfectPayMissing } from './headers/perfectpayHeader'
import { kiwifyHeader, KiwifyHeaderValues, kiwifyMissing } from './headers/kiwifyHeader'
import { eduzzHeader, EduzzHeaderValues, eduzzMissing } from './headers/eduzzHeader'
import { greennHeader, GreennHeaderValues, greennMissing } from './headers/greennHeader'
import { tmbHeader, TmbHeaderValues, tmbMissing } from './headers/tmbHeader'
import { hublaHeader, HublaHeaderValues, hublaMissing } from './headers/hublaHeader'
import { guruHeader, GuruHeaderValues, guruMissing } from './headers/guruHeader'
import { tictHeader, TictHeaderValues, tictMissing } from './headers/tictHeader'
import { voompHeader, VoompHeaderValues, voompMissing } from './headers/voompHeader'

type Props = {
  remainderHeaderValues: Omit<SpreadSheet, 'dataUrl'> & {
    records: ParseResult<{
      [key: string]: string
    }>
  }
}

export const formattingPlatformType = ({ remainderHeaderValues }: Props) => {
  switch (remainderHeaderValues.platform) {
    case 'hotmart':
      return headerTreatment<typeof hotmartHeader, HotmartHeaderValues>({
        platformHeader: hotmartHeader,
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
    case 'ticto':
      return headerTreatment<typeof tictHeader, TictHeaderValues>({
        headerMissing: tictMissing,
        platformHeader: tictHeader,
        ...remainderHeaderValues
      })
    default:
      throw new Error('Platform not found')
  }
}
