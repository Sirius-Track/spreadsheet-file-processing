import { readFile, unlink } from 'node:fs/promises'

import Papa from 'papaparse'

import type { SpreadSheet } from './types'

import { SpreadSheetSchema } from './validation/validation'

export const spreadSheed = async (data: SpreadSheet) => {
  const { dataUrl, userId, projectId, sendTo } = SpreadSheetSchema.parse(data)

  console.log(dataUrl, userId, projectId, sendTo)

  const fileContent = await readFile(dataUrl, 'utf8')
  console.log(fileContent)
  /* try {
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
  } */
}
