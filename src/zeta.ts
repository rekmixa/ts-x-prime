import { Complex } from './'
import { generateSieve, sieveToPrimes } from './'

// Вычисление дзета-функции для действительных s > 1
export function zetaReal(s: number, terms: number = 10_000, debug: boolean = false): number {
  if (s <= 1) {
    throw new Error('This simple method only works for s > 1')
  }

  let sum = 0
  for (let n = 1; n <= terms; n++) {
    const m = 1 / Math.pow(n, s)
    sum += m
    if (debug) {
      console.log(`n = ${n}, m = ${m}, sum = ${sum}`)
    }
  }

  return sum
}

// Произведение Эйлера для ряда простых чисел при s > 1
export function zetaEuler(s: number, sieveMax: number = 10_000, debug: boolean = false): number {
  if (s <= 1) {
    throw new Error('zetaEuler is only valid for s > 1')
  }

  const sieve = generateSieve(sieveMax)
  const primes = sieveToPrimes(sieve)
  if (debug) {
    console.log(`primes count: ${primes.length}`)
  }

  let product = 1

  for (const p of primes) {
    const m = 1 / (1 - Math.pow(p, -s))
    product *= m
    if (debug) {
      console.log(`p = ${p}, m = ${m}, product = ${product}`)
    }
  }

  return product
}

// Реализация гамма-функции по формуле Ланцоша
export function gamma(z: Complex): Complex {
  // Коэффициенты для формулы Ланцоша
  const p = [
    676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012,
    9.9843695780195716e-6, 1.5056327351493116e-7,
  ]

  const g = 7

  // Рефлексивная формула для гамма-функции, если Re(z) < 0.5
  if (z.re < 0.5) {
    // Используем отражающую формулу Эйлера для гамма-функции:
    // Γ(z) = π / (sin(πz) * Γ(1 - z))
    const piC = new Complex(Math.PI, 0)

    // Γ(z) = π / (sin(π z) Γ(1-z)) — рефлексивная формула
    return piC.div(
      piC
        .mul(z)
        .sin()
        .mul(gamma(new Complex(1, 0).sub(z))),
    )
  }

  // Основная формула Ланцоша для Re(z) >= 0.5
  let x = new Complex(0.99999999999980993, 0)
  let z1 = z.sub(new Complex(1, 0))

  for (let i = 0; i < p.length; i++) {
    // x += p[i] / (z1 + i + 1)
    x = x.add(new Complex(p[i], 0).div(z1.add(new Complex(i + 1, 0))))
  }

  const t = z1.add(new Complex(g + 0.5, 0))
  const sqrtTwoPi = Math.sqrt(2 * Math.PI)

  // Итоговая формула:
  // Γ(z) = sqrt(2π) * t^{z-0.5} * e^{-t} * x
  return new Complex(sqrtTwoPi, 0)
    .mul(t.pow(z1.add(new Complex(0.5, 0))))
    .mul(x)
    .mul(t.neg().exp())
}

// Dirichlet η-функция: η(s) = ∑ (-1)^{n-1} / n^s
export function eta(s: Complex, terms: number): Complex {
  let sum = new Complex(0, 0)

  for (let n = 1; n <= terms; n++) {
    const sign = n % 2 === 0 ? -1 : 1
    const term = new Complex(n, 0).pow(s.neg()).mul(new Complex(sign, 0))

    sum = sum.add(term)
  }

  return sum
}

// Аналитическое продолжение дзета-функции
export function zeta(s: Complex, terms: number = 10_000): Complex {
  // Особая точка — полюс при s = 1
  if (Math.abs(s.subReal(1).abs()) < 1e-12) {
    throw new Error('Полюс дзета-функции при s = 1')
  }

  if (s.re > 0) {
    // η-функция (ряд Эйлера) сходится при Re(s) > 0
    const etaVal = eta(s, terms)
    const two = new Complex(2, 0)
    const denom = new Complex(1, 0).sub(two.pow(new Complex(1, 0).sub(s)))

    return etaVal.div(denom)
  } else {
    // Аналитическое продолжение через функциональное уравнение:
    // ζ(s) = 2^s * π^{s-1} * sin(πs/2) * Γ(1 - s) * ζ(1 - s)
    const piC = new Complex(Math.PI, 0)
    const one = new Complex(1, 0)
    const oneMinusS = one.sub(s)
    const zetaMirror = zeta(oneMinusS, terms)
    const sinTerm = s.mul(piC).mul(new Complex(0.5, 0)).sin()
    const gammaTerm = gamma(oneMinusS)
    const two = new Complex(2, 0)
    const front = two
      .pow(s)
      .mul(piC.pow(s.sub(one)))
      .mul(sinTerm)
      .mul(gammaTerm)

    return front.mul(zetaMirror)
  }
}
