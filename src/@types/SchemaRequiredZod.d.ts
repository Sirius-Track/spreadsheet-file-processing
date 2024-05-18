import { ZodType } from 'zod'

declare global {
  type SchemaRequiredZod<Schema> = {
    [k in keyof Schema]: ZodType<Schema[k]>
  }
}
