import { sendToChatGPT } from '../chatGPTService'

export async function sendAnalysisToChatGPT(analysis: any, prodPrice: any): Promise<string> {
  console.log('Entrando em chatGPT')

  const prompt = `
  Abaixo está uma análise das respostas de leads e compradores para uma pesquisa de qualificação.
  Use estas informações para fornecer um Lead Scoring de 5 faixas: Desqualificado, Ruim, Médio, Bom, Excelente.
  Análise:

  ${JSON.stringify(analysis, null, 2)}

  Por favor, forneça um relatório detalhado de Lead Scoring baseado nas respostas, considerando que o ticket do produto é ${prodPrice}.

 Ao somar os pontos marcados em cada pergunta a pontuação total deve enquadradar o lead em uma das faixas abaixo.

- Desqualificado: -20 a 0
- Ruim: 1 a 20
- Médio: 21 a 40
- Bom: 41 a 60
- Excelente: 61 a 100

  Por favor, mantenha um foco na relevância e no potencial de compra do lead.

  Forneça a resposta seguindo o seguinte padrão:

  Pergunta: (indicador de peso)
  - Resposta: x pontos
  - Resposta: x pontos
  - Resposta: x pontos
`
  const systemContent = 'Você é um assistente especializado em análises de dados e qualificação de leads.'

  return await sendToChatGPT(prompt, systemContent, 'gpt-4', 0.4)
}
