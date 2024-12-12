import axios from 'axios'
import papa from 'papaparse'

import { formattingPlatformType } from './shared'
import { isValidDate } from './shared/functions/validateDate'
import { isValidCurrency } from './shared/functions/validateCurrency'
import { isValidValue } from './shared/functions/validateValue'
import { SUPABASE_URL } from '@/contants'

import { PlatformCustom, SpreadSheet } from './types'

type Props = SpreadSheet &
  Partial<PlatformCustom> & {
    csvText: string
  }

type ValidationError = {
  line: number
  field: string
  value: string
  expectedType: string
}

export const processPostCSVBackground = async ({ dataUrl, userId, platform, projectId, csvText, ...custom }: Props) => {
  const BATCH_SIZE = 500

  const records = papa.parse<{ [key: string]: string }>(csvText, {
    header: true,
    skipEmptyLines: true
  })

  const validationErrors: ValidationError[] = []

  // Validate each row
  records.data.forEach((row, index) => {
    // The index is zero-based, so add 2 to get the actual line number (accounting for header)
    const lineNumber = index + 2

    // Validate date (assuming a 'date' column exists)
    if (row.date && !isValidDate(row.date)) {
      validationErrors.push({
        line: lineNumber,
        field: 'date',
        value: row.date,
        expectedType: 'Formato de data correto é YYYY-MM-DD ex: 2024-12-05 (atenção, o dia e mes devem ter 2 digitos)'
      })
    }

    // Validate currency (assuming a 'currency' column exists)
    if (row.currency && !isValidCurrency(row.currency)) {
      validationErrors.push({
        line: lineNumber,
        field: 'currency',
        value: row.currency,
        expectedType: 'Formato valido de moeda é ISO 4217 ex: BRL, USD, EUR...'
      })
    }

    // Validate value (assuming a 'value' column exists)
    if (row.value && !isValidValue(row.value)) {
      validationErrors.push({
        line: lineNumber,
        field: 'value',
        value: row.value,
        expectedType: 'Esperamos apenas números com divisor decimal sendo "." ex: 27232.90'
      })
    }

    // Add more specific validations based on your platform/custom requirements
    // For example:
    // if (platform === 'shopify' && !isValidShopifyColumn(row.someColumn)) { ... }
  })

  // Send validation error notifications
  if (validationErrors.length > 0) {
    // Group errors by type for more concise notifications
    const errorGroups = validationErrors.reduce((acc, error) => {
      const key = `${error.field}_${error.expectedType}`
      if (!acc[key]) {
        acc[key] = {
          field: error.field,
          expectedType: error.expectedType,
          lines: []
        }
      }
      acc[key].lines.push(error.line)
      return acc
    }, {} as Record<string, { field: string; expectedType: string; lines: number[] }>)

    // Send notifications for each error group
    for (const [, errorGroup] of Object.entries(errorGroups)) {
      try {
        await axios.post(
          'https://app.siriusltv.com/api/1.1/wf/notification',
          {
            title: 'Error Detected: Dados mal formatados.',
            actionUrl: '',
            message: `Valor inválido encontrado: ${errorGroup.field}. Formato esperado: ${
              errorGroup.expectedType
            }. Linhas afetadas: ${errorGroup.lines.join(', ')}`,
            projectId: projectId,
            readStatus: false,
            type: 'warn'
          },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        )
      } catch (error) {
        console.error('Error sending validation notification:', error)
      }
    }

    // Optionally, you might want to stop processing or handle errors differently
    throw new Error(`Validation failed. ${validationErrors.length} errors found.`)
  }

  // If no errors, proceed with existing processing logic
  const remainderHeaderValues = { records, platform, userId, projectId }

  const platformsRows = formattingPlatformType({ ...remainderHeaderValues, custom })

  for (let count = 0; count < platformsRows.length; count += BATCH_SIZE) {
    const csvChunk = platformsRows.slice(count, count + BATCH_SIZE)
    // Consolando o csvChunk antes de enviar
    //console.log('csvChunk:', JSON.stringify(csvChunk, null, 2))
    await axios.post(`${SUPABASE_URL}/functions/v1/postCSV`, csvChunk, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate'
      }
    })
  }
  await axios.post(
    'https://app.siriusltv.com/api/1.1/wf/notification',
    {
      title: 'Envios concluídos com sucesso!',
      actionUrl: '',
      message:
        'Todos os dados de vendas foram processados, atualize a página para visualizar suas informações, qualquer divergência ou dúvida acione nosso Suporte clicando no menu superior, teremos o prazer em ajudá-lo.',
      projectId: projectId, // Passa o projectId dinamicamente
      readStatus: false,
      type: 'success',
      reloadPageBT: true
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )

  // TODO: mover url para env
  await axios.post(
    'https://app.siriusltv.com/api/1.1/wf/removefileafterupload/',
    { fileUrl: dataUrl },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )

  await axios.post(
    'https://app.siriusltv.com/api/1.1/wf/notification',
    {
      title: 'Arquivo Removido',
      actionUrl: '',
      message:
        'O arquivo CSV enviado foi removido do nosso servidor para garantir que suas informações fiquem somente na nossa base de dados 100% segura.',
      projectId: projectId, // Passa o projectId dinamicamente
      readStatus: false,
      type: 'info'
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}
