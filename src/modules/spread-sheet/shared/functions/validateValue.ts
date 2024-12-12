export function isValidValue(value: string): boolean {
  const regex = /^\d+(\.\d{1,2})?$/;
  return regex.test(value);
}