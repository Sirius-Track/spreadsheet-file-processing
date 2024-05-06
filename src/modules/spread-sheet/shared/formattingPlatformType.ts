import { headerTreatment } from './headerTreatment'

import * as Headers from './'

import type { ParseResult } from 'papaparse'
import type { SpreadSheet } from '../types'

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
      return headerTreatment<typeof Headers.hotmartHeader, any>({
        platformHeader: Headers.hotmartHeader,
        ...remainderHeaderValues
      })
    case 'perfectpay':
      return headerTreatment<typeof Headers.perfectpayHeader, Headers.PerfectpayHeaderValues>({
        headerMissing: Headers.perfectPayMissing,
        platformHeader: Headers.perfectpayHeader,
        ...remainderHeaderValues
      })
    case 'kiwify':
      return headerTreatment<typeof Headers.kiwifyHeader, Headers.KiwifyHeaderValues>({
        headerMissing: Headers.kiwifyMissing,
        platformHeader: Headers.kiwifyHeader,
        ...remainderHeaderValues
      })
    case 'eduzz':
      return headerTreatment<typeof Headers.eduzzHeader, Headers.EduzzHeaderValues>({
        headerMissing: Headers.eduzzMissing,
        platformHeader: Headers.eduzzHeader,
        ...remainderHeaderValues
      })
    case 'greenn':
      return headerTreatment<typeof Headers.greennHeader, Headers.GreennHeaderValues>({
        headerMissing: Headers.greennMissing,
        platformHeader: Headers.greennHeader,
        ...remainderHeaderValues
      })
    case 'tmb':
      return headerTreatment<typeof Headers.tmbHeader, Headers.TmbHeaderValues>({
        headerMissing: Headers.tmbMissing,
        platformHeader: Headers.tmbHeader,
        ...remainderHeaderValues
      })
    case 'hubla':
      return headerTreatment<typeof Headers.hublaHeader, Headers.HublaHeaderValues>({
        headerMissing: Headers.hublaMissing,
        platformHeader: Headers.hublaHeader,
        ...remainderHeaderValues
      })
    case 'guru':
      return headerTreatment<typeof Headers.guruHeader, Headers.GuruHeaderValues>({
        headerMissing: Headers.guruMissing,
        platformHeader: Headers.guruHeader,
        ...remainderHeaderValues
      })
    case 'ticto':
      return headerTreatment<typeof Headers.tictHeader, Headers.TictHeaderValues>({
        headerMissing: Headers.tictMissing,
        platformHeader: Headers.tictHeader,
        ...remainderHeaderValues
      })
    default:
      throw new Error('Platform not found')
  }
}
