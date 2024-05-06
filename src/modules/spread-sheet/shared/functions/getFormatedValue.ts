import dayjs from 'dayjs'

type Props = {
  isFormatted: boolean
  value: string
}

export const getFormatedValue = ({ isFormatted, value }: Props) => {
  if (isFormatted) {
    const dateFormated = dayjs(value, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD')

    return dateFormated
  }

  return value.trim()
}
