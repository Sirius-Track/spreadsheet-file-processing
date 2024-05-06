import dayjs from 'dayjs'

type Props = {
  isFormatted: boolean
  value: string
}

const identifyDateFormat = (value: string): string => {
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    return 'YYYY-MM-DD HH:mm:ss'
  }

  if (/^\d{4}\/\d{2}\/\d{2}/.test(value)) {
    return 'YYYY/MM/DD HH:mm:ss'
  }

  if (/^\d{2}-\d{2}-\d{4}/.test(value)) {
    return 'DD-MM-YYYY HH:mm:ss'
  }

  if (/^\d{2}-\d{2}-\d{4}/.test(value)) {
    return 'DD-MM-YYYY HH:mm:ss'
  }

  if (/^\d{2}\/\d{2}\/\d{4}/.test(value)) {
    return 'DD/MM/YYYY HH:mm:ss'
  }

  return value
}

export const getFormatedValue = ({ isFormatted, value }: Props) => {
  if (isFormatted) {
    const format = identifyDateFormat(value)

    const dateFormatted = dayjs(value, format).format('YYYY-MM-DD')

    return dateFormatted
  }

  return value.trim()
}
