import { getFormatedValue } from '@/shared/getFormatedValue'

import type { ParseResult } from 'papaparse'

import type { Row, RowData } from '../types'
import type { Missing } from './types'
import { HTTPError } from '../../../errors'

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
  const headersAlreadyChanged = records.data.map((row: any) => {
    const formattedRow: RowData = {
      platform,
      user_id: userId,
      project_id: projectId
    }

    for (const [header, value] of Object.entries({ ...row, ...formattedRow })) {
      // Ignorar headers inválidos ou campos do sistema já definidos
      const systemFields = ['platform', 'user_id', 'project_id']
      const isInvalidHeader = !header || header === 'null' || header === 'undefined' || header.trim() === ''
      
      if (systemFields.includes(header) || isInvalidHeader) {
        continue
      }

      const mappedHeader = platformHeader[header] as string

      const isFormattedDate = Boolean(mappedHeader && ['transaction_date'].includes(mappedHeader.toLowerCase()))

      if (mappedHeader) {
        formattedRow[mappedHeader] = getFormatedValue({ isFormattedDate, value }) as string
      } else {
        throw new HTTPError(
          `Header ${header} not found in platform ${platform} headers requireds list \n ${Object.keys(platformHeader)}`
        )
      }
    }

    return formattedRow
  })

  if (['hotmart', 'hotmartspanish'].includes(platform)) {
    return headersAlreadyChanged
  }

  const headersAlreadyChangedMissingTreaties = headersAlreadyChanged?.map((row: any) => headerMissing?.(row as any))

  return headersAlreadyChangedMissingTreaties
}
