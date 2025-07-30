import { describe, it, expect } from 'vitest'
import { zetaReal, zetaEuler, gamma, eta, zeta, Complex } from '../src'

const terms = 100_000
const round = (x: number, digits = 4) =>
  Math.round(x * 10 ** digits) / 10 ** digits

describe('zetaReal', () => {
  it('zetaReal(2) ≈ π² / 6', () => {
    const result = zetaReal(2, terms)
    expect(round(result)).toBe(round(Math.PI ** 2 / 6))
  })

  it('zetaReal(4) ≈ π⁴ / 90', () => {
    const result = zetaReal(4, terms)
    expect(round(result)).toBe(round(Math.PI ** 4 / 90))
  })
})

describe('zetaEuler', () => {
  it('zetaEuler(2) ≈ π² / 6', () => {
    const result = zetaEuler(2, terms)
    expect(round(result)).toBe(round(Math.PI ** 2 / 6))
  })
})

describe('gamma', () => {
  it('gamma(0.5) ≈ √π', () => {
    const g = gamma(new Complex(0.5, 0))
    expect(round(g.re)).toBe(round(Math.sqrt(Math.PI)))
    expect(g.im).toBeCloseTo(0, 6)
  })

  it('gamma(1) ≈ 1', () => {
    const g = gamma(new Complex(1, 0))
    expect(round(g.re)).toBe(1)
    expect(g.im).toBeCloseTo(0, 6)
  })
})

describe('eta', () => {
  it('eta(1 + 0i) ≈ ln(2)', () => {
    const e = eta(new Complex(1, 0), terms)
    expect(round(e.re)).toBe(round(Math.log(2)))
    expect(e.im).toBeCloseTo(0, 6)
  })
})

describe('zeta (complex)', () => {
  it('zeta(2 + 0i) ≈ π² / 6', () => {
    const z = zeta(new Complex(2, 0), terms)
    expect(round(z.re)).toBe(round(Math.PI ** 2 / 6))
    expect(z.im).toBeCloseTo(0, 6)
  })
})
