import { describe, it, expect } from 'vitest'
import { isValidSkillName, isValidDescription } from '../validation'

describe('isValidSkillName', () => {
  it('空文字列は無効', () => {
    expect(isValidSkillName('')).toBe(false)
  })

  it('50文字以内は有効', () => {
    expect(isValidSkillName('TypeScript')).toBe(true)
  })

  it('51文字以上は無効', () => {
    expect(isValidSkillName('a'.repeat(51))).toBe(false)
  })
})

describe('isValidDescription', () => {
  it('200文字以内は有効', () => {
    expect(isValidDescription('これは説明です')).toBe(true)
  })

  it('201文字以上は無効', () => {
    expect(isValidDescription('a'.repeat(201))).toBe(false)
  })
})
