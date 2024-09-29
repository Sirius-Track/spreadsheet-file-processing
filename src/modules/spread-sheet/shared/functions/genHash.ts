import ShortHash from 'short-hash'

export const genHash = (text: string | null) => {
  const hash = ShortHash(text || '')

  return hash
}
