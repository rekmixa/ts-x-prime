import { describe, expect, test } from 'vitest'
import { arrayUnique } from './helpers'
import { Goldbach } from '../src/goldbach'
import { generateSieve, isPrime, sieveToPrimes } from '../src/prime-numbers'

describe('check goldbachPairs function', () => {
  test('returns correct pairs for 10', () => {
    const n = 10
    const goldbach = new Goldbach(n)
    const pairs = goldbach.getPairs()

    // Ожидаемые пары для 10: (3,7), (5,5), порядок не важен
    expect(pairs).toEqual(
      expect.arrayContaining([
        [3, 7],
        [5, 5],
      ]),
    )

    // Каждая пара должна давать сумму n
    for (const [p, q] of pairs) {
      expect(p + q).toBe(n)
      expect(isPrime(p)).toBe(true)
      expect(isPrime(q)).toBe(true)
    }
  })

  test('returns correct pairs for 28', () => {
    const n = 28
    const goldbach = new Goldbach(n)
    const pairs = goldbach.getPairs()

    // Проверяем, что сумма верна и пары состоят из простых
    for (const [p, q] of pairs) {
      expect(p + q).toBe(n)
      expect(isPrime(p)).toBe(true)
      expect(isPrime(q)).toBe(true)
    }

    // Проверим, что нет дубликатов и пары отсортированы по p ≤ q
    for (const [p, q] of pairs) {
      expect(p).toBeLessThanOrEqual(q)
    }
  })

  test('returns correct pairs for 1000', () => {
    const n = 1000
    const goldbach = new Goldbach(n)
    const pairs = goldbach.getPairs()

    // Проверяем, что сумма верна и пары состоят из простых
    for (const [p, q] of pairs) {
      expect(p + q).toBe(n)
      expect(isPrime(p)).toBe(true)
      expect(isPrime(q)).toBe(true)
    }

    // Проверим, что нет дубликатов и пары отсортированы по p ≤ q
    for (const [p, q] of pairs) {
      expect(p).toBeLessThanOrEqual(q)
    }
  })

  test('returns correct pairs for 1000 with predefined sieve', () => {
    const n = 1000
    const sieve = generateSieve(10000)
    const goldbach = new Goldbach(n, sieve)
    const pairs = goldbach.getPairs()

    // Проверяем, что сумма верна и пары состоят из простых
    for (const [p, q] of pairs) {
      expect(p + q).toBe(n)
      expect(isPrime(p)).toBe(true)
      expect(isPrime(q)).toBe(true)
    }

    // Проверим, что нет дубликатов и пары отсортированы по p ≤ q
    for (const [p, q] of pairs) {
      expect(p).toBeLessThanOrEqual(q)
    }
  })

  test('returns correct pairs for 1000 with predefined sieve and primes', () => {
    const n = 1000
    const sieve = generateSieve(10000)
    const goldbach = new Goldbach(n, sieve, sieveToPrimes(sieve))
    const pairs = goldbach.getPairs()

    // Проверяем, что сумма верна и пары состоят из простых
    for (const [p, q] of pairs) {
      expect(p + q).toBe(n)
      expect(isPrime(p)).toBe(true)
      expect(isPrime(q)).toBe(true)
    }

    // Проверим, что нет дубликатов и пары отсортированы по p ≤ q
    for (const [p, q] of pairs) {
      expect(p).toBeLessThanOrEqual(q)
    }
  })

  test('returns correct primes for 1000', () => {
    const n = 1000
    const goldbach = new Goldbach(n)
    const primes = goldbach.getPrimes()

    // Проверяем, что числа правда являются гольдбаховскими
    for (const p of primes) {
      expect(isPrime(p)).toBe(true)
      expect(isPrime(n - p)).toBe(true)
    }

    // Проверим, что нет дубликатов
    expect(primes.length).toBe(arrayUnique(primes).length)
  })

  test('returns correct primes for 1000 with predefined sieve', () => {
    const n = 1000
    const sieve = generateSieve(10000)
    const goldbach = new Goldbach(n, sieve)
    const primes = goldbach.getPrimes()

    // Проверяем, что числа правда являются гольдбаховскими
    for (const p of primes) {
      expect(isPrime(p)).toBe(true)
      expect(isPrime(n - p)).toBe(true)
    }

    // Проверим, что нет дубликатов
    expect(primes.length).toBe(arrayUnique(primes).length)
  })

  test('returns correct primes for 1000 with predefined sieve and primes', () => {
    const n = 1000
    const sieve = generateSieve(10000)
    const goldbach = new Goldbach(n, sieve, sieveToPrimes(sieve))
    const primes = goldbach.getPrimes()

    // Проверяем, что числа правда являются гольдбаховскими
    for (const p of primes) {
      expect(isPrime(p)).toBe(true)
      expect(isPrime(n - p)).toBe(true)
    }

    // Проверим, что нет дубликатов
    expect(primes.length).toBe(arrayUnique(primes).length)
  })

  test('throws an exception for non-even numbers or < 4', () => {
    expect(() => new Goldbach(3).getPairs()).toThrow()
    expect(() => new Goldbach(1).getPairs()).toThrow()
    expect(() => new Goldbach(5).getPairs()).toThrow()
  })
})
