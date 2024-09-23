import { perfectpayHeader } from '../shared/headers/perfectpayHeader'
import { kiwifyHeader } from '../shared/headers/kiwifyHeader'
import { eduzzHeader } from '../shared/headers/eduzzHeader'
import { greennHeader } from '../shared/headers/greennHeader'
import { tmbHeader } from '../shared/headers/tmbHeader'
import { hublaHeader } from '../shared/headers/hublaHeader'
import { guruHeader } from '../shared/headers/guruHeader'
import { herosparkHeader } from '../shared/headers/herosparkHeader'
import { voompHeader } from '../shared/headers/voompHeader'
import { tictoHeader } from '../shared/headers/tictoHeader'
import { hotmartHeader } from '../shared/headers/hotmartHeader'
import { SpreadSheet } from '../types'

const platformHeaders: Record<SpreadSheet['platform'], Record<string, string>> = {
  hotmart: hotmartHeader,
  perfectpay: perfectpayHeader,
  kiwify: kiwifyHeader,
  eduzz: eduzzHeader,
  greenn: greennHeader,
  tmb: tmbHeader,
  hubla: hublaHeader,
  guru: guruHeader,
  herospark: herosparkHeader,
  voompheader: voompHeader,
  tictoo: tictoHeader,
  custom: {}
}

type Props = Pick<SpreadSheet, 'platform'> & {
  headers: string[]
}

export const validateCsvHeaders = ({ platform, headers }: Props) => {
  const expectedHeadersMap = platformHeaders[platform]

  if (!expectedHeadersMap) {
    throw new Error('Plataforma desconhecida.')
  }

  const expectedHeaders = Object.keys(expectedHeadersMap)

  // Log cabeçalhos recebidos e esperados
  console.log('Cabeçalhos recebidos:', headers)
  console.log('Cabeçalhos esperados:', expectedHeaders)

  // Check if all expected headers are present
  const isValid = expectedHeaders.every(header => headers.includes(header))
  let missingHeaders

  if (!isValid) {
    console.log(
      'Cabeçalhos faltando:',
      expectedHeaders.filter(header => !headers.includes(header))
    )
    missingHeaders = expectedHeaders.filter(header => !headers.includes(header))
    return { isValid, missingHeaders }
  } else {
    return { isValid, missingHeaders }
  }
}
