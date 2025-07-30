/**
 * Вычисляет наибольший общий делитель (НОД) чисел a и b
 * с помощью алгоритма Евклида
 * @param a - первое число
 * @param b - второе число
 * @returns наибольший общий делитель a и b
 */
export function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }

  return a
}

// Проверка, является ли число степенью другого
export function isPerfectPower(number: number): boolean {
  for (let exponent = 2; exponent <= Math.log2(number); exponent++) {
    const approxBase = Math.pow(number, 1 / exponent)
    if (Math.round(Math.pow(Math.round(approxBase), exponent)) === number) {
      return true
    }
  }

  return false
}
