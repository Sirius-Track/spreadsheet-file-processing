import { headerTreatment } from './headerTreatment'

import {
  perfectpayHeader,
  perfectPayMissing,
  eduzzHeader,
  eduzzMissing,
  greennHeader,
  greennMissing,
  guruHeader,
  hublaHeader,
  tmbHeader,
  hotmartHeader,
  kiwifyHeader,
  tictHeader,
  kiwifyMissing,
  hublaMissing,
  tictMissing,
  guruMissing,
  tmbMissing
} from '.'

import type {
  EduzzHeaderValues,
  GreennHeaderValues,
  PerfectpayHeaderValues,
  GuruHeaderValues,
  HublaHeaderValues,
  TmbHeaderValues,
  KiwifyHeaderValues,
  TictHeaderValues
} from '.'
import type { SpreadSheet } from '../types'
import type { ParseResult } from 'papaparse'

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
      return headerTreatment<typeof hotmartHeader, any>({
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
    case 'ticto':
      return headerTreatment<typeof tictHeader, TictHeaderValues>({
        headerMissing: tictMissing,
        platformHeader: tictHeader,
        ...remainderHeaderValues
      })
  }
}
