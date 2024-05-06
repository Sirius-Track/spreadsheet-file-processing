import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

type Props = {
  isFormatted: boolean
  value: string
}

export const getFormatedValue = ({ isFormatted, value }: Props) => {
  dayjs.extend(customParseFormat)

  if (isFormatted) {
    const dateFormated = dayjs(value, 'DD/MM/YYYY').format('YYYY-MM-DD')

    return dateFormated
  }

  return value.trim()
}
