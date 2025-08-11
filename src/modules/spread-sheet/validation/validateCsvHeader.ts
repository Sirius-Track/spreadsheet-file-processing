import { perfectpayHeader } from '../shared/headers/perfectpayHeader'
import { kiwifyHeader } from '../shared/headers/kiwifyHeader'
import { eduzzHeader } from '../shared/headers/eduzzHeader'
import { greennHeader } from '../shared/headers/greennHeader'
import { tmbHeader } from '../shared/headers/tmbHeader'
import { hublaHeader } from '../shared/headers/hublaHeader'
import { xgrowHeader } from '../shared/headers/xgrowHeader'
import { guruHeader } from '../shared/headers/guruHeader'
import { herosparkHeader } from '../shared/headers/herosparkHeader'
import { voompHeader } from '../shared/headers/voompHeader'
import { tictoHeader } from '../shared/headers/tictoHeader'
import { hotmartSpanishHeader } from '../shared/headers/hotmartSpanishHeader'
import { hotmartHeader } from '../shared/headers/hotmartHeader'
import { PlatformCustom, SpreadSheet } from '../types'
import { HeadersValues } from '../shared/headers/types'

type ValidationResult = {
  isValid: boolean
  missingHeaders: string[] | undefined
}

type Props = Pick<SpreadSheet, 'platform'> & {
  headers: string[]
}

export const validateCsvHeaders = ({ platform, headers }: Props): ValidationResult => {
  const expectedHeadersMap = platformHeaders(platform, headers)

  if (!expectedHeadersMap) {
    throw new Error('Plataforma desconhecida.')
  }

  const expectedHeaders = Object.keys(expectedHeadersMap)

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

const platformHeaders = (platform: SpreadSheet['platform'], headers: string[]) => {
  const headersMap: Record<SpreadSheet['platform'], Record<string, string>> = {
    perfectpay: perfectpayHeader,
    kiwify: kiwifyHeader,
    eduzz: eduzzHeader,
    greenn: greennHeader,
    tmb: tmbHeader,
    hubla: hublaHeader,
    xgrow: xgrowHeader,
    guru: guruHeader,
    herospark: herosparkHeader,
    voomp: voompHeader,
    ticto: tictoHeader,
    hotmart: hotmartHeader,
    hotmartspanish: hotmartSpanishHeader,
    custom: headers.reduce<HeadersValues<PlatformCustom>>((acc, key) => {
      acc[key as keyof PlatformCustom] = key as keyof PlatformCustom

      return acc
    }, {})
  }

  return headersMap[platform]
}
