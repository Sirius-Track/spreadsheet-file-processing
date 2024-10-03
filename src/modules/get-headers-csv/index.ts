import papa from 'papaparse'
import { analyzeCSVHeadersAndFormats } from './validateValuesCsv'

type HeadersCsv =
  | {
      headers: string[]
      sample: string[]
      comment: string // Adicionado para o comentário do ChatGPT
    }
  | undefined

export const getHeadersCSV = async (dataUrl: string): Promise<HeadersCsv> => {
  // Fetch do CSV
  const fileCSV = await fetch(dataUrl)

  if (!fileCSV.ok) {
    throw new Error('File not found')
  }

  const csvText = await fileCSV.text()

  if (!csvText) {
    throw new Error('File is empty')
  }

  // Extrai os headers e a primeira linha do CSV
  const records = papa.parse<Record<string, string>>(csvText, { header: true, skipEmptyLines: true })

  if (records.errors.length > 0) {
    throw new Error('CSV inválido.')
  }

  const headers: string[] | undefined = records.meta.fields

  if (!headers || headers.length === 0) {
    throw new Error('Nenhum header encontrado no CSV.')
  }

  // Obtém a primeira linha de dados
  const firstRow = records.data[0]
  const sample: string[] = headers.map(header => (firstRow ? firstRow[header] || '' : ''))

  // Monta o objeto para análise pelo ChatGPT
  const csvHeadersData = {
    headers,
    sample
  }

  // Envia a análise ao ChatGPT
  //const comment = await analyzeCSVHeadersAndFormats(csvHeadersData)

  // Retorna o resultado final, incluindo o comentário do ChatGPT
  return {
    headers,
    sample,
    comment // Inclui o comentário gerado pelo ChatGPT
  }
}
