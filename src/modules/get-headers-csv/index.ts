import papa from 'papaparse'

type HeadersCsv =
  | {
      data: {
        [header: string]: {
          sample: string
        }
      }
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
  const records = papa.parse(csvText, { header: true, skipEmptyLines: true })

  if (records.errors.length > 0) {
    throw new Error('CSV inválido.')
  }

  const headers: string[] | undefined = records.meta.fields

  if (!headers || headers.length === 0) {
    throw new Error('Nenhum header encontrado no CSV.')
  }

  // Obtém a primeira linha de dados
  const firstRow = records.data[0]
  const data = headers.reduce((acc, header) => {
    acc[header] = { sample: firstRow ? firstRow[header] || '' : '' }
    return acc
  }, {} as HeadersCsv['data'])

  return {
    data
  }
}
