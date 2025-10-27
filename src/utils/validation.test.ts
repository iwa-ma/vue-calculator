import { describe, it, expect } from 'vitest'
import { isExceedingMaxDigit } from './validation'

/**
 * validation.tsのテスト
 * isExceedingMaxDigit関数に引数2つ(現在の値、追加する桁数)を渡して、最大桁数を超えているかテスト
 */
describe('isExceedingMaxDigit', () => {
  it('空文字列は最大桁数を超えていない', () => {
    expect(isExceedingMaxDigit('')).toBe(false)
  })

  it('17桁の値は最大桁数を超えていない(false)', () => {
    const value = '12345678901234567'
    expect(isExceedingMaxDigit(value)).toBe(false)
  })

  it('18桁の値は最大桁数を超えている(true)', () => {
    const value = '123456789012345678'
    expect(isExceedingMaxDigit(value)).toBe(true)
  })

  it('19桁以上の値は最大桁数を超えている(true)', () => {
    const value = '1234567890123456789'
    expect(isExceedingMaxDigit(value)).toBe(true)
  })

  it('追加桁数なしで17桁は最大桁数を超えていない(false)', () => {
    const value = '12345678901234567'
    expect(isExceedingMaxDigit(value, 0)).toBe(false)
  })

  it('追加桁数1で17桁は最大桁数を超えている(true)', () => {
    const value = '12345678901234567'
    expect(isExceedingMaxDigit(value, 1)).toBe(true)
  })

  it('追加桁数2で16桁は最大桁数を超えている (true)', () => {
    const value = '1234567890123456'
    expect(isExceedingMaxDigit(value, 2)).toBe(true)
  })

  it('小数点を含む値(18桁:数値17桁 + 小数点1桁)でも正しく動作する(false)', () => {
    const value = '123456789012345.6'
    expect(isExceedingMaxDigit(value)).toBe(false)
  })

  it('小数点を含む値(19桁:数値18桁 + 小数点1桁)で最大桁数を超える場合(true)', () => {
    const value = '12345678901234567.8'
    expect(isExceedingMaxDigit(value)).toBe(true)
  })

  it('負の数でも正しく動作する(false)', () => {
    const value = '-1234567890123456'
    expect(isExceedingMaxDigit(value)).toBe(false)
  })

  it('負の数で最大桁数を超える場合(true)', () => {
    const value = '-12345678901234567'
    expect(isExceedingMaxDigit(value)).toBe(true)
  })
})

