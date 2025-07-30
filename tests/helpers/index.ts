import fs from 'fs'

export function getPrimeNumbers(): number[] {
  return JSON.parse(
    fs.readFileSync('tests/data/prime-numbers-dataset.json').toString(),
  )
}
