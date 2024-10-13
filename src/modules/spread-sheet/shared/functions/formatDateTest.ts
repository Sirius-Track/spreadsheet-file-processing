import { formatDate } from './formatDate'

const testDates = [
  { input: '13-10-2024', expected: '2024-10-13' },
  { input: '2024-10-13', expected: '2024-10-13' },
  { input: '2024/10/13', expected: '2024-10-13' },
  { input: '13/10/2024', expected: '2024-10-13' },
  { input: '2024-10-13T14:30:00Z', expected: '2024-10-13' },
  { input: '2024-10-13T14:30:00+02:00', expected: '2024-10-13' },
  { input: '2024-10-13T14:30:00.123Z', expected: '2024-10-13' }
]

testDates.forEach(({ input, expected }) => {
  try {
    const result = formatDate(input)
    console.log(`Input: ${input} | Result: ${result} | Expected: ${expected}`)
  } catch (error) {
    console.error(`Input: ${input} | Error: ${error.message}`)
  }
})
