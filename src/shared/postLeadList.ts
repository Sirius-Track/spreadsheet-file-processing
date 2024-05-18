import axios from 'axios'

type Props<T> = {
  data: T
  supabaseURL: string
}

export const postLeadList = async <T>({ data, supabaseURL }: Props<T>) => {
  try {
    await axios.post(`${supabaseURL}/functions/v1/postLeadList`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate'
      }
    })
  } catch (error) {
    console.error('Erro ao enviar dados para o postLeadList:', error)
    throw error
  }
}
