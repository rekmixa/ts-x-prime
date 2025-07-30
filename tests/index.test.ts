import { describe, it, expect } from 'vitest'
import { add } from '../src'

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toBe(5)
  })

  it('works with negative numbers', () => {
    expect(add(-1, -1)).toBe(-2)
  })
})
