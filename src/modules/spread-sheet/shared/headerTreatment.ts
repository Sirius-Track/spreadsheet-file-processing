import { getFormatedValue } from '@/shared/getFormatedValue'

import type { ParseResult } from 'papaparse'

import type { Row, RowData } from '../types'
import type { Missing } from './types'

type Props<Headers = string, Values = {}> = Omit<Row, 'user_id' | 'project_id'> & {
  userId: string
  projectId: string
  platformHeader: {
    [x: string]: keyof Headers
  }
  records: ParseResult<{
    [key: string]: string
  }>
  headerMissing?: (row: Missing<Values>) => Values
}

export const headerTreatment = <Headers, Values>({
  platformHeader,
  records,
  platform,
  userId,
  projectId,
  headerMissing
}: Props<Headers, Values>) => {
  // console.log('Headers recebidos no headerTreatment:', platformHeader)
  // console.log('Dados das linhas recebidos no headerTreatment:', records.data)
  const headersAlreadyChanged = records.data.map(row => {
    const formattedRow: RowData = {
      platform,
      user_id: userId,
      project_id: projectId
    }
    // console.log('Processando linha do CSV:', row) // Log para ver cada linha processada
    for (const [header, value] of Object.entries({ ...row, ...formattedRow })) {
      const mappedHeader = platformHeader[header] as string

      const isFormattedDate = Boolean(mappedHeader && ['transaction_date'].includes(mappedHeader.toLowerCase()))

      if (mappedHeader) {
        //  console.log(`Header mapeado: ${header} -> ${mappedHeader}`) // Verifica o mapeamento dos headers
        formattedRow[mappedHeader] = getFormatedValue({ isFormattedDate, value })
      } else {
        //  console.warn(`Header não mapeado: ${header}`) // Se o header não for mapeado corretamente
      }
    }

    return formattedRow
  })

  const missingHeaders = () => {
    if (platform === 'hotmart') {
      return headersAlreadyChanged
    }

    const headersAlreadyChangedMissingTreaties = headersAlreadyChanged.map(row => headerMissing?.(row as any))

    return headersAlreadyChangedMissingTreaties
  }

  return missingHeaders()
}
