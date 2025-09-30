import fs from 'fs'

export function getPrimeNumbers(): number[] {
  return JSON.parse(
    fs.readFileSync('tests/data/prime-numbers-dataset.json').toString(),
  )
}

export function arrayUnique<T>(array: T[]): T[] {
  return array.reduce((carry: T[], value: T): T[] => {
    if (carry.indexOf(value) === -1) {
      carry.push(value)
    }

    return carry
  }, [])
}
