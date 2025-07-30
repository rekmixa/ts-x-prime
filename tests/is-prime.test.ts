import fs from 'fs'
import { describe, expect, test } from 'vitest'
import { isPrime, isPrimeAKS } from '../src'

const primeNumbers: number[] = JSON.parse(
  fs.readFileSync('tests/data/prime-numbers-dataset.json').toString(),
)

const lastPrimeNumber: number = primeNumbers[primeNumbers.length - 1]

describe('check is-prime logic', () => {
  for (let i = 1; i <= 1000; i++) {
    test(`check non-integer number ${i}`, () => {
      expect(isPrime(i + 0.1)).toBe(false)
      expect(isPrimeAKS(i + 0.1)).toBe(false)
    })
  }

  for (let i = 1; i <= lastPrimeNumber; i++) {
    const expectedResult = primeNumbers.includes(i)

    test(`isPrime: ${i}`, () => {
      const actualResult = isPrime(i)
      expect(actualResult).toBe(expectedResult)
    })

    test(`isPrimeAKS: ${i}`, () => {
      const actualResultAks = isPrimeAKS(i)
      expect(actualResultAks).toBe(expectedResult)
    })
  }
})
