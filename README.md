# ts-x-prime

A lightweight TypeScript library for working with prime numbers: generate primes, test for primality, and use the AKS primality test.

![npm](https://img.shields.io/npm/v/ts-x-prime)
![license](https://img.shields.io/npm/l/ts-x-prime)
![types](https://img.shields.io/npm/types/ts-x-prime)

---

## Installation

```bash
npm install ts-x-prime
```

or with pnpm:

```bash
pnpm add ts-x-prime
```

or with yarn:

```bash
yarn add ts-x-prime
```

## Features

| Function             | Description                                                      |
| -------------------- | ---------------------------------------------------------------- |
| `generateSieve(n)`   | Generates a boolean sieve of Eratosthenes up to `n`              |
| `sieveToPrimes(s)`   | Converts a sieve to a list of primes                             |
| `isPrimeSieve(n, s)` | Checks if `n` is prime using a precomputed sieve                 |
| `isPrime(n)`         | Checks if `n` is prime using the 6k ± 1 optimization             |
| `isPrimeAKS(n)`      | Checks if `n` is prime using the AKS primality test (slow)       |
| `zetaReal(s, terms)` | Approximates the Riemann zeta function for real `s`              |
| `zetaEuler(s, max)`  | Evaluates ζ(s) via the Euler product using primes up to `max`    |
| `gamma(z)`           | Computes the gamma function for a complex number `z`             |
| `eta(s, terms)`      | Dirichlet eta function η(s) for complex `s` with specified terms |
| `zeta(s, terms)`     | Approximates ζ(s) for complex `s` using analytic continuation    |

---

## Usage Examples

```ts
import {
  generateSieve,
  sieveToPrimes,
  isPrimeSieve,
  isPrime,
  isPrimeAKS,
  zetaReal,
  zetaEuler,
  gamma,
  eta,
  zeta,
  Complex,
} from 'ts-x-prime'

// Generate primes using sieve
const sieve = generateSieve(100)
const primes = sieveToPrimes(sieve) // [2, 3, 5, 7, 11, ..., 97]

// Check using sieve
console.log(isPrimeSieve(37, sieve)) // true
console.log(isPrimeSieve(40, sieve)) // false

// Check using 6k ± 1 method
console.log(isPrime(29)) // true
console.log(isPrime(35)) // false

// Check using AKS (slow)
console.log(isPrimeAKS(13)) // true
console.log(isPrimeAKS(15)) // false

// Real zeta function
console.log(zetaReal(2)) // ~1.6449 (π²/6)

// Zeta via Euler product
console.log(zetaEuler(2)) // ~1.6449

// Gamma function
console.log(gamma({ re: 0.5, im: 0 })) // ~1.772 (√π)

// Dirichlet eta
console.log(eta({ re: 1, im: 0 }, 10000)) // ~ln(2)

// Full zeta function (complex)
console.log(zeta(new Complex(2, 0))) // ~1.6449
```

---

## Notes

- `isPrimeAKS` uses the deterministic AKS algorithm and is intended for theoretical or educational use. It's very slow for large inputs.
- `isPrime` uses the 6k ± 1 method, which is efficient for medium-sized numbers.
- `zetaReal`, `zetaEuler`, `zeta`, `eta`, and `gamma` are provided for exploration of analytic number theory.
- For large batches of prime checks, prefer generating a sieve first.

---

## License

MIT © [rekmixa](https://github.com/rekmixa)
