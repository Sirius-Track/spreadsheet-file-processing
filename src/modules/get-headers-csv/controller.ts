import { getHeadersCSV } from '.'
import type { RequestHandler } from 'express'

export const getHeadersCSVInit: RequestHandler = async (req, res) => {
  try {
    // Extrai os headers do CSV
    const headers = await getHeadersCSV(req.body.dataUrl)

    // Responde ao frontend com os headers do CSV
    res.status(200).send({
      headers
    })
  } catch (erro: any) {
    res.status(400).send({
      message: erro.message || 'Erro ao processar o arquivo CSV'
    })
  }
}
