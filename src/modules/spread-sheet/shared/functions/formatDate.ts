export function formatDate(dateStr: string): string {
  const dateRegex = [
    // Formatos com hífen
    { regex: /^\d{2}-\d{2}-\d{4}$/, format: 'DD-MM-YYYY' },
    { regex: /^\d{4}-\d{2}-\d{2}$/, format: 'YYYY-MM-DD' },
    { regex: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, format: 'YYYY-MM-DD HH:mm:ss' },

    // Formatos com barra
    { regex: /^\d{2}\/\d{2}\/\d{4}$/, format: 'DD/MM/YYYY' },
    { regex: /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/, format: 'DD/MM/YYYY HH:mm:ss' },
    { regex: /^\d{4}\/\d{2}\/\d{2}$/, format: 'YYYY/MM/DD' },
    { regex: /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/, format: 'YYYY/MM/DD HH:mm:ss' },

    // Formatos ISO 8601 com UTC
    { regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, format: 'YYYY-MM-DDTHH:mm:ssZ' }, // UTC
    { regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}$/, format: 'YYYY-MM-DDTHH:mm:ss+HH:MM' }, // Fuso horário
    { regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }, // Milissegundos com UTC
    { regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+\d{2}:\d{2}$/, format: 'YYYY-MM-DDTHH:mm:ss.SSS+HH:MM' } // Milissegundos com fuso horário
  ]

  for (const { regex, format } of dateRegex) {
    if (regex.test(dateStr)) {
      // Se o formato for 'YYYY-MM-DD', não precisa alterar
      if (format === 'YYYY-MM-DD') return dateStr.split(' ')[0] // Remove parte de tempo, se houver

      // Para formatos no estilo DD-MM-YYYY ou DD/MM/YYYY
      if (format === 'DD-MM-YYYY' || format === 'DD/MM/YYYY') {
        const [day, month, year] = dateStr.split(/[-\/]/)
        return `${year}-${month}-${day}`
      }

      // Para formatos com horas, ignoramos a parte da hora e retornamos apenas a data
      if (format.includes('HH:mm:ss')) {
        const [datePart] = dateStr.split(' ')
        const [day, month, year] = datePart.split(/[-\/]/)
        return `${year}-${month}-${day}`
      }

      // Para outros formatos (ex.: ISO 8601), remove a parte da hora
      if (format.includes('T')) {
        return dateStr.split('T')[0] // Mantém apenas a parte da data
      }

      // Para outros formatos desconhecidos
      const [year, month, day] = dateStr.split(/[-\/ ]/)
      return `${year}-${month}-${day}`
    }
  }

  throw new Error('Invalid date format')
}
