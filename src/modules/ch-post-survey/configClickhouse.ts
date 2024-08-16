import { createClient } from '@clickhouse/client'

// Configuração do cliente ClickHouse
export const clickhouseClient = createClient({
  url: 'https://ss2vsxt1pf.us-central1.gcp.clickhouse.cloud:8443',
  username: 'default',
  password: 'URB9mntP~oC8C'
})

// Código de teste opcional que pode ser removido em produção
void (async () => {
  try {
    const rows = await clickhouseClient.query({
      query: 'SELECT 1',
      format: 'JSONEachRow'
    })
    console.log('Result: ', await rows.json())
  } catch (error) {
    console.error('Erro ao conectar com o ClickHouse:', error.message)
  }
})()
