export function formatPhone(phoneStr: string | null | undefined): string {
  if (!phoneStr) {
    return ''
  }

  // Remove tudo que não seja número
  const phoneRegex = /[^\d]/g
  let cleanedPhone = phoneStr.replace(phoneRegex, '')

  // Retorna apenas os primeiros 11 dígitos
  return cleanedPhone.substring(0, 11)
}
