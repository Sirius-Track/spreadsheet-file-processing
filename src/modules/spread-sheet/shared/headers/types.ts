type HeadersValues<T> = {
  [key in string]: keyof T
}
