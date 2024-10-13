export function formatCurrency(valueStr: string | null | undefined): string {
  if (!valueStr) {
    // Se o valor for null ou undefined, retornar '0.00' ou lidar de acordo com a sua necessidade
    return '0.00'
  }

  // Remove símbolos de moeda e espaços extras
  const currencyRegex = /[$€£R\s]/g
  let cleanedValue = valueStr.replace(currencyRegex, '')

  // Verifica se o separador de milhar é vírgula ou ponto e remove os separadores
  if (/,\d{3}\.\d{2}$/.test(cleanedValue)) {
    // Caso 1,000.00
    cleanedValue = cleanedValue.replace(/,/g, '')
  } else if (/\.\d{3},\d{2}$/.test(cleanedValue)) {
    // Caso 1.000,00
    cleanedValue = cleanedValue.replace(/\./g, '').replace(',', '.')
  } else if (/,\d{2}$/.test(cleanedValue)) {
    // Caso geral de vírgulas para decimais (exemplo: 3507,36)
    cleanedValue = cleanedValue.replace(',', '.')
  }

  const parsedValue = parseFloat(cleanedValue).toFixed(2)

  if (isNaN(Number(parsedValue))) {
    throw new Error('Invalid currency format')
  }

  return parsedValue
}
