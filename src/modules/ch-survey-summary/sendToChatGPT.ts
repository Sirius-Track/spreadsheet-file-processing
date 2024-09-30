import fetch from 'node-fetch'

export async function sendAnalysisToChatGPT(analysis: any, prodPrice: any): Promise<string> {
  console.log('Entrando em chatGPT')
  const openAIEndpoint = 'https://api.openai.com/v1/chat/completions' // Endpoint da OpenAI

  // Prepare o input personalizado e a análise que será enviada para a API do ChatGPT
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

  try {
    const response = await fetch(openAIEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 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` // Coloque aqui sua chave da API da OpenAI
      },
      body: JSON.stringify({
        model: 'gpt-4', // Use o modelo que você deseja utilizar, pode ser GPT-3.5-turbo ou GPT-4
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente especializado em análises de dados e qualificação de leads.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.4 // Ajuste a temperatura conforme necessário
      })
    })

    if (!response.ok) {
      throw new Error(`Erro ao se comunicar com a API do OpenAI: ${response.statusText}`)
    }

    const result = (await response.json()) as { choices: { message: { content: string } }[] }
    const chatGPTResponse = result.choices[0].message.content

    console.log('Resposta da API do ChatGPT:', chatGPTResponse)

    // Retorne a resposta do ChatGPT
    return chatGPTResponse
  } catch (error) {
    console.error('Erro ao enviar a análise para o ChatGPT:', error)
    throw error
  }
}
