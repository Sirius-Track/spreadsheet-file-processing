// chatGPTService.ts
import axios from 'axios'

export async function sendToChatGPT(
  prompt: string,
  systemContent: string,
  model: string = 'gpt-4', // Modelo dinâmico
  temperature: number = 0.5
): Promise<string> {
  const openAIEndpoint = 'https://api.openai.com/v1/chat/completions'

  try {
    const response = await axios.post(
      openAIEndpoint,
      {
        model: model, // Modelo dinâmico
        messages: [
          {
            role: 'system',
            content: systemContent
          },
          { role: 'user', content: prompt }
        ],
        temperature: temperature
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`
        }
      }
    )

    if (!response.data) {
      throw new Error(`Erro ao se comunicar com a API do OpenAI: ${response.statusText}`)
    }

    const result = response.data as { choices: { message: { content: string } }[] }
    return result.choices[0].message.content
  } catch (error) {
    console.error('Erro ao enviar a requisição para o ChatGPT:', error)
    throw error
  }
}
