import { sendToChatGPT } from '../chatGPTService'

export async function analyzeCSVHeadersAndFormats(headers: any, gptModel: any): Promise<string> {
  console.log('Analisando cabeçalhos e formatos de valores no CSV')

  const prompt = `
  Abaixo está uma lista de cabeçalhos de um CSV, juntamente com exemplos de valores correspondentes. Analise os valores e comente especificamente sobre a formatação de números e datas.

  As regras de formatação são as seguintes:
  - Números decimais devem usar ponto (.) como separador decimal, e nunca vírgula (,).
  - Datas devem estar no formato 'YYYY-MM-DD'. Não aceitamos datas que incluam horas, minutos ou segundos.

  Se identificar qualquer valor que não esteja de acordo com essas regras, forneça um comentário detalhado sobre o que está incorreto e o que deve ser ajustado.

  Cabeçalhos e exemplos de valores:

  ${JSON.stringify(headers, null, 2)}

  Por favor, forneça um relatório detalhado de quaisquer ajustes de formatação necessários, garantindo que todos os números e datas sigam as regras especificadas.
`

  const systemContent =
    'Você é um assistente especializado em análise de formatação de dados em arquivos CSV, com foco em validação rigorosa de formatos numéricos e de data conforme as regras descritas.'

  let model = `gpt-${gptModel}`
  return await sendToChatGPT(prompt, systemContent, model, 0.5)
}
