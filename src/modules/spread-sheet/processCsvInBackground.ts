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

  try {
    const records = papa.parse<{ [key: string]: string }>(csvText, {
      header: true,
      skipEmptyLines: true
    })

    // If no errors, proceed with existing processing logic
    const remainderHeaderValues = { records, platform, userId, projectId }

    console.log('Chegou no platformsRows')

    const platformsRows = formattingPlatformType({ ...remainderHeaderValues, custom })

    // Platform-aware validation on normalized fields (post-mapping)
    const validationErrors: ValidationError[] = []
    const valueFieldsToCheck = [
      'value',
      'purchase_value',
      'purchase_value_with_tax',
      'purchase_value_without_tax',
      'my_commission_value'
    ]

    platformsRows.forEach((row: any, index: number) => {
      const lineNumber = index + 2 // account for header line

      // Currency (normalized key)
      const currencyRaw = row?.currency?.toString()?.trim()
      // Try to extract a 3-letter ISO code when label contains extra text e.g., "BRL - Real"
      const currency = currencyRaw?.includes(' ')
        ? currencyRaw.split(' ')[0].toUpperCase()
        : currencyRaw?.toUpperCase()
      if (currency && /^[A-Z]{3}$/.test(currency) && !isValidCurrency(currency)) {
        validationErrors.push({
          line: lineNumber,
          field: 'currency',
          value: currencyRaw || '',
          expectedType: 'Código de moeda ISO 4217 válido'
        })
      }

      // Dates (normalized key)
      const transactionDate = row?.transaction_date?.toString()?.trim()
      if (transactionDate && !isValidDate(transactionDate)) {
        validationErrors.push({
          line: lineNumber,
          field: 'transaction_date',
          value: transactionDate,
          expectedType: 'Data no formato YYYY-MM-DD'
        })
      }

      // Numeric values (normalized keys)
      for (const key of valueFieldsToCheck) {
        if (row?.[key] === undefined) continue
        const raw = row[key]
        const rawStr = raw?.toString()?.trim()
        // Skip placeholders or empty strings
        if (!rawStr || /^(undefined|null|none|\(none\))$/i.test(rawStr)) continue
        const normalized = raw
          ?.toString()
          .trim()
          .replace(/\s/g, '')
          .replace('$', '')
          .replace(/\./g, '') // remove thousands separators
          .replace(',', '.') // ensure decimal dot

        if (normalized && !isValidValue(normalized)) {
          validationErrors.push({
            line: lineNumber,
            field: key,
            value: rawStr,
            expectedType: 'Número decimal válido (use . para separar)'
          })
        }
      }
    })

    if (validationErrors.length > 0) {
      const errorGroups = validationErrors.reduce(
        (acc, error) => {
          const key = `${error.field}_${error.expectedType}`
          if (!acc[key]) {
            acc[key] = {
              field: error.field,
              expectedType: error.expectedType,
              lines: [] as number[],
              values: [] as string[]
            }
          }
          acc[key].lines.push(error.line)
          acc[key].values.push(error.value)
          return acc
        },
        {} as Record<
          string,
          {
            field: string
            expectedType: string
            lines: number[]
            values: string[]
          }
        >
      )

      for (const [, errorGroup] of Object.entries(errorGroups)) {
        try {
          await axios.post(
            'https://app.siriusltv.com/api/1.1/wf/notification',
            {
              title: 'Error Detected: Dados mal formatados.',
              actionUrl: '',
              message: `Campo inválido: ${errorGroup.field}.\nFormato esperado: ${errorGroup.expectedType}.\nLinhas afetadas: ${errorGroup.lines.join(', ')}.\nValores inválidos: ${errorGroup.values.join(', ')}`,
              projectId: projectId,
              readStatus: false,
              type: 'warn'
            },
            {
              headers: { 'Content-Type': 'application/json' }
            }
          )
        } catch (error) {
          console.error('Error sending validation notification:', (error as any)?.response?.data || (error as any)?.message)
        }
      }

      // Stop processing after notifying
      throw new Error(`Validation failed. ${validationErrors.length} errors found.`)
    }

    console.log(`Processing ${platformsRows.length} records in batches of ${BATCH_SIZE}`)

    for (let count = 0; count < platformsRows.length; count += BATCH_SIZE) {
      const csvChunk = platformsRows.slice(count, count + BATCH_SIZE)
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
  } catch (error) {
    console.error('Error processing CSV:', (error as any)?.message || error)
    
    // Send error notification to user
    try {
      await axios.post(
        'https://app.siriusltv.com/api/1.1/wf/notification',
        {
          title: 'Erro no Processamento',
          actionUrl: '',
          message: `Ocorreu um erro ao processar o arquivo CSV: ${(error as any)?.message || 'Erro desconhecido'}. Por favor, verifique o arquivo e tente novamente ou entre em contato com o suporte.`,
          projectId: projectId,
          readStatus: false,
          type: 'error'
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
    } catch (notificationError) {
      console.error('Error sending error notification:', notificationError)
    }
    
    // Re-throw to be handled by caller
    throw error
  }
}
