import fetch from 'node-fetch' // Se você estiver usando Node.js

export async function scoreSchemaChatGPT(scoreSchema: any, projectId: any, userId: any): Promise<string> {
  console.log('Preparando Schema...')
  const openAIEndpoint = 'https://api.openai.com/v1/chat/completions' // Endpoint da OpenAI

  // Prepare o input personalizado e a análise que será enviada para a API do ChatGPT
  const prompt = `
  A"Por favor, transforme o seguinte texto em um formato JSON que contenha objetos para cada pergunta, resposta e pontuação, além de projectId (${projectId}) e userId (${userId}). O texto é o seguinte:

'${scoreSchema}'

O formato do JSON deve ser assim: { "question": "texto da pergunta", "answer": "texto da resposta", "score": número, "projectId": "${projectId}", "userId": "${userId}" }

A cada pergunta e resposta, deve ser gerado um novo objeto no JSON."
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
            content:
              'Você é um assistente especializado em transformar textos com perguntas e respostas em um formato JSON estruturado. Sempre que receber um texto, organize as perguntas, respostas e pontuações em objetos JSON que incluem question, answer, score, projectId e userId.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.5 // Ajuste a temperatura conforme necessário
      })
    })

    if (!response.ok) {
      throw new Error(`Erro ao se comunicar com a API do OpenAI: ${response.statusText}`)
    }

    const result = await response.json()
    const chatGPTSchema = result.choices[0].message.content

    console.log('Resposta da API do ChatGPT:', chatGPTSchema)

    // Retorne a resposta do ChatGPT
    return chatGPTSchema
  } catch (error) {
    console.error('Erro ao enviar a análise para o ChatGPT:', error)
    throw error
  }
}
