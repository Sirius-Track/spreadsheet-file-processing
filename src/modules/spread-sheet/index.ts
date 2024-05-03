import { readFile, unlink } from 'node:fs/promises'

import Papa from 'papaparse'

export const spreadSheed = async (filePath: string) => {
  const fileContent = await readFile(filePath, 'utf8')

  try {
    await new Promise((res, rej) => {
      Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        complete: async results => {
          try {
            const typedResults = results.data as Record<string, string>[]

            console.log({ typedResults })

            res(null)
          } catch (error) {
            rej(error)
          }
        }
      })
    })
  } catch (error) {
    throw error
  } finally {
    await unlink(filePath)
  }
}
