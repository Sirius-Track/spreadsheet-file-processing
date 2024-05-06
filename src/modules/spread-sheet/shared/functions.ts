import Hashids from 'https://esm.sh/hashids@2.2.10'

const hashids = new Hashids('this is my salt', 8)

export function generateId(input: string): string {
  const hash = hashString(input)
  return hashids.encode(hash)
}

function hashString(input: string): string {
  const hash = Array.from(input).reduce((hash, char) => {
    hash = (hash << 5) - hash + char.charCodeAt(0)
    return hash & hash
  }, 0)
  return Math.abs(hash).toString()
}
