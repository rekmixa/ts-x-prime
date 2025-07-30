import { describe, expect, test } from 'vitest'
import { isPrimeAKS } from '../src'
import { getPrimeNumbers } from './helpers'

const primeNumbers: number[] = getPrimeNumbers()
const lastPrimeNumber: number = primeNumbers[primeNumbers.length - 1]

describe('check isPrimeAKS logic', () => {
  test('check non-integer numbers', () => {
    for (let i = 1; i <= 1000; i++) {
      expect(isPrimeAKS(i + 0.1), String(i)).toBe(false)
    }
  })

  test('check isPrimeAKS function', () => {
    for (let i = 1; i <= lastPrimeNumber; i++) {
      const expectedResult = primeNumbers.includes(i)
      const actualResultAks = isPrimeAKS(i)
      expect(actualResultAks, String(i)).toBe(expectedResult)
    }
  })
})
