import { SpreadSheetSchema } from './validation/SpreadSheetSchema'

import { processPostCSVBackground } from './processCsvInBackground'

import type { SpreadSheet } from './types'

import axios from 'axios'
import papa from 'papaparse'

export const spreadSheed = async (data: SpreadSheet) => {
  const { dataUrl, userId, platform, projectId, ...rest } = SpreadSheetSchema.parse(data)

  console.log(`Recebido dados para plataforma: ${platform}`)

  const fileCSV = await fetch(dataUrl)

  if (!fileCSV.ok) {
    throw new Error('File not found')
  }

  const csvText = await fileCSV.text()

  if (!csvText) {
    throw new Error('File is empty')
  }

  // Contando o número de linhas excluindo o header
  const records = papa.parse(csvText, {
    header: true,
    skipEmptyLines: true
  })

  const numRecords = records.data.length // Contagem de registros sem o cabeçalho

  // Enviando notificação que X vendas estão sendo processadas
  await axios.post('https://siriusltv.com/api/1.1/wf/notifications', {
    title: 'Processamento Iniciado',
    actionUrl: '',
    message: `${numRecords} vendas estão sendo processadas neste momento em segundo plano, você receberá notificação de conclusão na página do projeto.`,
    projectId: projectId,
    readStatus: false,
    type: 'info'
  })

  processPostCSVBackground({ dataUrl, userId, platform, projectId, csvText, ...rest })
}
