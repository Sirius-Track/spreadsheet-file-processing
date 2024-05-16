import ShortHash from 'short-hash'

export const genHash = (text: string) => {
  const hash = ShortHash(text)

  return hash
}
