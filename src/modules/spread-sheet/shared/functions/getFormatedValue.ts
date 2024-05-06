type Props = {
  isFormatted: boolean
  value: string
}

export const getFormatedValue = ({ isFormatted, value }: Props) => {
  if (isFormatted) {
    return value.trim().replace(/\//g, '-').split(' ')[0]
  }

  return value.trim()
}
