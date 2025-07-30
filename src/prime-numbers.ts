export function sieveToPrimes(sieve: boolean[]): number[] {
  return sieve.reduce<number[]>((carry, isPrime, number): number[] => {
    if (isPrime) {
      carry.push(number)
    }

    return carry
  }, [])
}

// Генерация решета Эратосфена до max
export function generateSieve(max: number): boolean[] {
  const sieve = new Array(max + 1).fill(true)
  sieve[0] = false
  sieve[1] = false
  for (let i = 2; i * i <= max; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= max; j += i) {
        sieve[j] = false
      }
    }
  }

  return sieve
}

// Быстрая проверка на простоту по решету
export function isPrimeSieve(number: number, sieve: boolean[]): boolean {
  return sieve[number] || false
}

export function isPrime(number: number): boolean {
  if (!Number.isInteger(number)) {
    return false // нецелое число не может быть простым
  }

  if (number <= 1) {
    return false
  }

  if (number <= 3) {
    return true
  }

  if (number % 2 === 0 || number % 3 === 0) {
    return false
  }

  if (number < 25) {
    return (
      number === 5 ||
      number === 7 ||
      number === 11 ||
      number === 13 ||
      number === 17 ||
      number === 19 ||
      number === 23
    )
  }

  // Проверка делимости на 5 и 7
  if (number % 5 === 0 || number % 7 === 0) {
    return false
  }

  // Проверяем числа вида 6k ± 1 до sqrt(num)
  for (let i = 11; i * i <= number; i += 6) {
    if (number % i === 0 || number % (i + 2) === 0) {
      return false
    }
  }

  return true
}
