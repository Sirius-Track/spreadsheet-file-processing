import axios from 'axios'
import papa from 'papaparse'

import { formattingPlatformType } from './shared'

import { SpreadSheet } from './types'

type Props = SpreadSheet & {
  csvText: string
}

export const processPostCSVBackground = async ({ dataUrl, userId, platform, projectId, csvText, ...custom }: Props) => {
  console.log(`Processando Background os dados para plataforma: ${platform}`)
  const BATCH_SIZE = 500
  const SUPABASE_URL = process.env.SUPABASE_URL

  const records = papa.parse<{ [key: string]: string }>(csvText, {
    header: true,
    skipEmptyLines: true
  })
  console.log('Dados CSV processados:', records.data)
  console.log('Headers CSV:', records.meta.fields)
  const remainderHeaderValues = { records, platform, userId, projectId }
  // Adicionando logs para verificar o estado dos dados
  console.log('Dados para formattingPlatformType:', remainderHeaderValues, custom)

  const platformsRows = formattingPlatformType({ ...remainderHeaderValues, custom })
  console.log('Rows indice zero:')
  console.log(platformsRows[0])
  console.log('Rows pós processamento:', platformsRows)
  console.log('Primeira linha:', platformsRows[0])

  for (let count = 0; count < platformsRows.length; count += BATCH_SIZE) {
    const csvChunk = platformsRows.slice(count, count + BATCH_SIZE)

    await axios.post(`${SUPABASE_URL}/functions/v1/postCSV`, csvChunk, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate'
      }
    })
  }

  // TODO: mover url para env
  await axios.post(
    'https://siriusltv.com/api/1.1/wf/removefileafterupload/',
    { fileUrl: dataUrl },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}
