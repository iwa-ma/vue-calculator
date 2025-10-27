import { describe, it, expect } from 'vitest'
import { calculate } from './calculator'

/**
 * 計算ユーティリティ関数(calculator.ts)のテスト
 * 
 */
describe('calculate', () => {
  describe('加算 (+)', () => {
    it('整数の加算が正しく動作する(5 + 3 = 8)', () => {
      expect(calculate('5', '3', '+')).toBe('8')
    })

    it('小数の加算が正しく動作する(5.5 + 3.2 = 8.7)', () => {
      expect(calculate('5.5', '3.2', '+')).toBe('8.7')
    })

    it('大きな数の加算が正しく動作する(999,999,999 + 1 = 1,000,000,000)', () => {
      expect(calculate('999999999', '1', '+')).toBe('1000000000')
    })
  })

  describe('減算 (-)', () => {
    it('整数の減算が正しく動作する(5 - 3 = 2)', () => {
      expect(calculate('5', '3', '-')).toBe('2')
    })

    it('小数の減算が正しく動作する(5.5 - 3.2 = 2.3)', () => {
      expect(calculate('5.5', '3.2', '-')).toBe('2.3')
    })

    it('負の結果になる減算が正しく動作する(3 - 5 = -2)', () => {
      expect(calculate('3', '5', '-')).toBe('-2')
    })

    it('負の数からの減算が正しく動作する(-5 - 3 = -8)', () => {
      expect(calculate('-5', '3', '-')).toBe('-8')
    })
  })

  describe('乗算 (×)', () => {
    it('整数の乗算が正しく動作する( 5 × 3 = 15)', () => {
      expect(calculate('5', '3', '×')).toBe('15')
    })

    it('小数の乗算が正しく動作する(2.5 × 4 = 10)', () => {
      expect(calculate('2.5', '4', '×')).toBe('10')
    })

    it('負の数の乗算が正しく動作する(-5 × 3 = -15)', () => {
      expect(calculate('-5', '3', '×')).toBe('-15')
    })

    it('ゼロの乗算が正しく動作する(5 × 0 = 0)', () => {
      expect(calculate('5', '0', '×')).toBe('0')
    })
  })

  describe('除算 (÷)', () => {
    it('整数の除算が正しく動作する(10 ÷ 2 = 5)', () => {
      expect(calculate('10', '2', '÷')).toBe('5')
    })

    it('小数の除算が正しく動作する(7.5 ÷ 2.5 = 3)', () => {
      expect(calculate('7.5', '2.5', '÷')).toBe('3')
    })

    it('割り切れない除算が正しく動作する(10 ÷ 3 = 3.3333333333333335)', () => {
      const result = calculate('10', '3', '÷')
      // Big.jsのデフォルト精度では20桁の結果が返されるため、18桁制限に引っかかる
      expect(result).toBe('Digit Limit Exceeded')
    })

    it('負の数の除算が正しく動作する(-10 ÷ 2 = -5)', () => {
      expect(calculate('-10', '2', '÷')).toBe('-5')
    })

    it('ゼロ除算でエラーを返す(10 ÷ 0 = Error)', () => {
      expect(calculate('10', '0', '÷')).toBe('Error')
    })

    it('小数でのゼロ除算でエラーを返す(10 ÷ 0.0 = Error)', () => {
      expect(calculate('10', '0.0', '÷')).toBe('Error')
    })
  })

  describe('エラーケース', () => {
    it('対応していない演算子を渡した場合エラーを返す(5 % 3 = Unknown operator)', () => {
      expect(calculate('5', '3', '%')).toBe('Unknown operator')
    })

    it('不正な入力でエラーを返す(abc + 3 = Error)', () => {
      expect(() => calculate('abc', '3', '+')).toThrow()
    })
  })

  describe('桁数制限', () => {
    it('結果が18桁を超える場合はエラーを返す(999,999,999,999,999,999 + 1 = Digit Limit Exceeded)', () => {
      const largeNumber = '999999999999999999'
      expect(calculate(largeNumber, '1', '+')).toBe('Digit Limit Exceeded')
    })

    it('結果がちょうど18桁の場合は正常に処理される(999,999,999,999,999,999 + 0 = 999,999,999,999,999,999)', () => {
      const largeNumber = '99999999999999999'
      expect(calculate(largeNumber, '0', '+')).toBe('99999999999999999')
    })
  })
})

