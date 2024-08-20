import papa from 'papaparse'

type HeadersCsv = string[] | undefined

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

  // Extrai os headers do CSV
  const records = papa.parse(csvText, { header: true, skipEmptyLines: true })

  if (records.errors.length > 0) {
    throw new Error('CSV inválido.')
  }

  const headers: HeadersCsv = records.meta.fields

  if (!headers || headers.length === 0) {
    throw new Error('Nenhum header encontrado no CSV.')
  }

  return headers
}
