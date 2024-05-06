import * as xlsx from 'node-xlsx'

export const convertXLSXtoCSV = (filePath: string) => {
  const obj = xlsx.parse(filePath)

  const rows: any[] = []
  
  let csvString = ''

  for (const sheet of obj) {
    for (const row of sheet['data']) {
      rows.push(row)
    }
  }

  for (const row of rows) {
    csvString += row.join(',') + '\n'
  }

  try {
    const blob = new Blob([csvString], { type: 'text/csv' })

    return blob
  } catch (err) {
    new Error(`Failed to convert XLSX to CSV, try sending a csv file instead of a xlsx file. Error: ${err}`)
  }
}