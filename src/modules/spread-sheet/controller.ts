// controller.ts

import { spreadSheed } from '.'
import { validateCsvHeaders } from './validation/validateCsvHeader'

import * as z from 'zod'
import papa from 'papaparse'

import { platforms } from './validation/SpreadSheetSchema'

import type { RequestHandler } from 'express'
import type { SpreadSheet } from './types'

export const SheetSchema = z.object<SchemaRequiredZod<Pick<SpreadSheet, 'dataUrl' | 'platform'>>>({
  dataUrl: z.string(),
  platform: z.custom(value => {
    if (!platforms.includes(value)) {
      throw new Error(`Invalid platform: ${value}, must be one of ${platforms.join(', ')}`)
    }

    return value
  })
})

export const createspreadSheed: RequestHandler = async (req, res) => {
  console.log(req.body)

  const { dataUrl, platform } = SheetSchema.parse(req.body)

  try {
    const fileCSV = await fetch(dataUrl)
    if (!fileCSV.ok) {
      return res.status(400).send({
        message: 'Arquivo CSV não encontrado'
      })
    }

    const csvText = await fileCSV.text()
    if (!csvText) {
      return res.status(400).send({
        message: 'Arquivo CSV está vazio'
      })
    }

    // Verificar cabeçalhos
    const parsedCsv = papa.parse(csvText, { header: true })
    const headers = parsedCsv.meta.fields || []

    const { isValid, missingHeaders } = validateCsvHeaders({ platform, headers })

    if (!isValid) {
      return res.status(201).send({
        message: 'Cabeçalhos do arquivo CSV estão inválidos para a plataforma selecionada, cabeçalhos esperados são:',
        missingHeaders
      })
    }

    // Processar o CSV se os cabeçalhos forem válidos
    await spreadSheed(req.body)

    return res.status(201).send({
      message: 'Seu arquivo está sendo processado com sucesso.'
    })
  } catch (error) {
    return res.status(500).send({
      message: 'Erro ao processar o arquivo CSV.',
      error: (error as Error).message
    })
  }
}
