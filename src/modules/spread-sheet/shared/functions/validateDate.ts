import { isValid, parse } from 'date-fns'

export function isValidDate(dateString: string): boolean {
  // Verifica se a string está no formato YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) return false

  // Usa date-fns para validar a data
  const date = parse(dateString, 'yyyy-MM-dd', new Date())
  return isValid(date)
}
