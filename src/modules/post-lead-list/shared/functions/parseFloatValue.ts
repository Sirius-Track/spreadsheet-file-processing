export const parseFloatValue = (value: string | number) => {
  const formattedValue = () => {
    if (String(value).includes(',')) {
      return value.toString().replace(/\./g, '').replace(',', '.')
    }

    return String(value)
  }

  return formattedValue().replace(/,/g, '.')
}
