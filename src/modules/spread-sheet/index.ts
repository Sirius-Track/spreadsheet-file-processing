import { readFile, unlink } from 'node:fs/promises'

import Papa from 'papaparse'

import type { SpreadSheet } from './types'

import { initialValidation } from './validation'

export const spreadSheed = async (data: SpreadSheet) => {
  const { dataUrl, userId, projectId, sendTo } = initialValidation(data)

  console.log(dataUrl)

  /* const fileContent = await readFile(filePath, 'utf8') */
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
