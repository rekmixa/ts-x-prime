import { gcd, isPerfectPower } from './'

// Арифметика многочленов по модулю x^r - 1 и по модулю number
export function addPolynomials(a: number[], b: number[], modulus: number): number[] {
  const length = Math.max(a.length, b.length)
  const result = Array(length).fill(0)
  for (let i = 0; i < length; i++) {
    const ai = i < a.length ? a[i] : 0
    const bi = i < b.length ? b[i] : 0
    result[i] = (ai + bi) % modulus
  }

  return result
}

export function multiplyPolynomials(
  a: number[],
  b: number[],
  modulus: number,
  polyModDegree: number,
): number[] {
  const result = Array(polyModDegree).fill(0)
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      const deg = (i + j) % polyModDegree
      result[deg] = (result[deg] + a[i] * b[j]) % modulus
    }
  }

  return result
}

export function modularPolynomialExponentiation(
  basePoly: number[],
  exponent: number,
  modulus: number,
  polyModDegree: number,
): number[] {
  let result = [1] // Многочлен "1"
  let base = basePoly
  let exp = exponent
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = multiplyPolynomials(result, base, modulus, polyModDegree)
    }
    base = multiplyPolynomials(base, base, modulus, polyModDegree)
    exp = Math.floor(exp / 2)
  }
  return result
}

// Нахождение минимального r для AKS
export function findCandidateR(number: number, maxExponent: number): number {
  let candidateR = 2
  while (candidateR < number) {
    let hasLargeOrder = true
    for (let exponentK = 1; exponentK <= maxExponent; exponentK++) {
      if (Math.pow(number, exponentK) % candidateR === 1) {
        hasLargeOrder = false
        break
      }
    }
    if (hasLargeOrder) {
      if (gcd(number, candidateR) === 1) {
        break
      }
    }
    candidateR++
  }
  return candidateR
}

// Проверка многочленов (x + a)^number ≡ x^number + a (mod x^r - 1, number)
export function checkPolynomialCongruence(
  number: number,
  candidateR: number,
): boolean {
  const log2Number = Math.log2(number)
  const maxTestBase = Math.floor(Math.sqrt(candidateR) * log2Number)

  for (let testBase = 1; testBase <= maxTestBase; testBase++) {
    const basePoly = [testBase, 1] // (x + a)
    const leftPoly = modularPolynomialExponentiation(
      basePoly,
      number,
      number,
      candidateR,
    )

    const rightPoly = Array(candidateR).fill(0)
    rightPoly[0] = testBase // Константа a
    rightPoly[number % candidateR] = 1 // Коэффициент при x^(number mod r)

    for (let i = 0; i < candidateR; i++) {
      if (leftPoly[i] !== rightPoly[i]) {
        return false
      }
    }
  }
  return true
}

// Проверяет число на простоту, используя алгоритм AKS (Agrawal–Kayal–Saxena)
export function isPrimeAKS(number: number): boolean {
  if (!Number.isInteger(number)) {
    return false // нецелое число не может быть простым
  }

  if (number <= 1) {
    return false
  }

  if (number === 2) {
    return true
  }

  if (isPerfectPower(number)) {
    return false
  }

  const log2Number = Math.log2(number)
  const maxExponent = Math.pow(log2Number, 2)

  const candidateR = findCandidateR(number, maxExponent)

  for (
    let testDivisor = 2;
    testDivisor <= Math.min(candidateR, number - 1);
    testDivisor++
  ) {
    if (gcd(number, testDivisor) > 1) {
      return false
    }
  }

  if (number <= candidateR) {
    return true
  }

  return checkPolynomialCongruence(number, candidateR)
}
