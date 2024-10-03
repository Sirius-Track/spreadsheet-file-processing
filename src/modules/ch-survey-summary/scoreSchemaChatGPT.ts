import { sendToChatGPT } from '../chatGPTService'

export async function scoreSchemaChatGPT(scoreSchema: any, projectId: any, userId: any): Promise<string> {
  console.log('Preparando Schema...')

  const prompt = `
  Por favor, transforme o seguinte texto em um formato JSON que contenha objetos para cada pergunta, resposta e pontuação, além de projectId (${projectId}) e userId (${userId}). O texto é o seguinte:

'${scoreSchema}'

O formato do JSON deve ser assim: { "question": "texto da pergunta", "answer": "texto da resposta", "score": número, "projectId": "${projectId}", "userId": "${userId}" }

A cada pergunta e resposta, deve ser gerado um novo objeto no JSON.
`
  const systemContent =
    'Você é um assistente especializado em transformar textos com perguntas e respostas em um formato JSON estruturado. Sempre que receber um texto, organize as perguntas, respostas e pontuações em objetos JSON que incluem question, answer, score, projectId e userId.'

  return await sendToChatGPT(prompt, systemContent, 'gpt-4', 0.5)
}
