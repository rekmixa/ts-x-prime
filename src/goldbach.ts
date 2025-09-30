import { generateSieve, isPrimeSieve, sieveToPrimes } from './prime-numbers'

export class Goldbach {
  readonly n: number
  readonly sieve: boolean[]
  readonly primes: number[]

  primesMemo?: number[]
  pairsMemo?: [number, number][]

  constructor(n: number, sieve?: boolean[], primes?: number[]) {
    if (n < 4 || n % 2 !== 0) {
      throw new Error('Число должно быть чётным и ≥ 4')
    }

    this.n = n
    this.sieve = sieve ?? generateSieve(n)
    this.primes = primes ?? sieveToPrimes(this.sieve)
  }

  getPairs(returnFirstOnly: boolean = false): [number, number][] {
    if (this.pairsMemo === undefined) {
      const pairs: [number, number][] = []

      for (const p of this.primes) {
        if (p > this.n / 2) {
          break
        }

        const q = this.n - p
        if (isPrimeSieve(q, this.sieve)) {
          pairs.push([p, q])
          if (returnFirstOnly) {
            break
          }
        }
      }

      this.pairsMemo = pairs
    }

    return this.pairsMemo
  }

  getPrimes(): number[] {
    if (this.primesMemo === undefined) {
      const primes: { [number: number]: number } = {}

      for (const p of this.primes) {
        if (p > this.n / 2) {
          break
        }

        const q = this.n - p
        if (isPrimeSieve(q, this.sieve)) {
          primes[p] = p
          primes[q] = q
        }
      }

      this.primesMemo = Object.values(primes)
    }

    return this.primesMemo
  }
}
