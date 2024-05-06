export type Missing<T> = {
  [K in keyof T]: string
}
