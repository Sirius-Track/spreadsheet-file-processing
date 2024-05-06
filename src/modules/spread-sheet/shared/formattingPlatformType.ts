import { headerTreatment } from './headerTreatment'

import * as Header from './'
import * as Missing from './'
import type * as Values from './'

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
      return headerTreatment<typeof Header.hotmartHeader, any>({
        platformHeader: Header.hotmartHeader,
        ...remainderHeaderValues
      })
    case 'perfectpay':
      return headerTreatment<typeof Header.perfectpayHeader, Values.PerfectpayHeaderValues>({
        headerMissing: Missing.perfectPayMissing,
        platformHeader: Header.perfectpayHeader,
        ...remainderHeaderValues
      })
    case 'kiwify':
      return headerTreatment<typeof Header.kiwifyHeader, Values.KiwifyHeaderValues>({
        headerMissing: Missing.kiwifyMissing,
        platformHeader: Header.kiwifyHeader,
        ...remainderHeaderValues
      })
    case 'eduzz':
      return headerTreatment<typeof Header.eduzzHeader, Values.EduzzHeaderValues>({
        headerMissing: Missing.eduzzMissing,
        platformHeader: Header.eduzzHeader,
        ...remainderHeaderValues
      })
    case 'greenn':
      return headerTreatment<typeof Header.greennHeader, Values.GreennHeaderValues>({
        headerMissing: Missing.greennMissing,
        platformHeader: Header.greennHeader,
        ...remainderHeaderValues
      })
    case 'tmb':
      return headerTreatment<typeof Header.tmbHeader, Values.TmbHeaderValues>({
        headerMissing: Missing.tmbMissing,
        platformHeader: Header.tmbHeader,
        ...remainderHeaderValues
      })
    case 'hubla':
      return headerTreatment<typeof Header.hublaHeader, Values.HublaHeaderValues>({
        headerMissing: Missing.hublaMissing,
        platformHeader: Header.hublaHeader,
        ...remainderHeaderValues
      })
    case 'guru':
      return headerTreatment<typeof Header.guruHeader, Values.GuruHeaderValues>({
        headerMissing: Missing.guruMissing,
        platformHeader: Header.guruHeader,
        ...remainderHeaderValues
      })
    case 'ticto':
      return headerTreatment<typeof Header.tictHeader, Values.TictHeaderValues>({
        headerMissing: Missing.tictMissing,
        platformHeader: Header.tictHeader,
        ...remainderHeaderValues
      })
  }
}
