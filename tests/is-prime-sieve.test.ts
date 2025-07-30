import { describe, expect, test } from 'vitest'
import { generateSieve, isPrimeSieve, sieveToPrimes } from '../src'
import { getPrimeNumbers } from './helpers'

const primeNumbers: number[] = getPrimeNumbers()
const lastPrimeNumber: number = primeNumbers[primeNumbers.length - 1]

describe('check is-prime-sieve logic', () => {
  test('check primes from dataset', () => {
    expect(primeNumbers.length).toBeGreaterThan(0)
  })

  const sieve = generateSieve(lastPrimeNumber)

  test('check sieve size', () => {
    expect(sieve.length).toBeGreaterThan(0)
    expect(sieve.length).toBe(lastPrimeNumber + 1)
  })

  const primes = sieveToPrimes(sieve)

  test('check primes count', () => {
    expect(primes.length).toBeGreaterThan(0)
    expect(primes.length).toBe(primeNumbers.length)
  })

  test('check primes in sieve', () => {
    for (const prime of primes) {
      expect(isPrimeSieve(prime, sieve), String(prime)).toBe(true)
      expect(primeNumbers.includes(prime), String(prime)).toBe(true)
    }
  })

  test('check numbers are not from sieve', () => {
    for (let i = 1; i < primeNumbers.length; i++) {
      if (isPrimeSieve(i, sieve)) {
        continue
      }

      expect(primeNumbers.includes(i), String(i)).toBe(false)
    }
  })
})
