export function isValidDate(dateString: string): boolean {
  // Verifica se a string está no formato YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) return false

  // Cria um objeto Date a partir da string
  const date = new Date(dateString)

  // Verifica se é uma data válida
  return !isNaN(date.getTime())
}
