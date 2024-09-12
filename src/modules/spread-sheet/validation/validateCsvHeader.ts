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

type PlatformHeaders = {
  [key: string]: { [headerName: string]: string }
}

const platformHeaders: PlatformHeaders = {
  hotmart: hotmartHeader,
  perfectpay: perfectpayHeader,
  kiwify: kiwifyHeader,
  eduzz: eduzzHeader,
  greenn: greennHeader,
  tmb: tmbHeader,
  hubla: hublaHeader,
  guru: guruHeader,
  herospark: herosparkHeader,
  voomp: voompHeader,
  ticto: tictoHeader
}

type ValidationResult = {
  isValid: boolean
  missingHeaders: string[] | undefined
}

export const validateCsvHeaders = (platform: string, headers: string[]): ValidationResult => {
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
