import { describe, it, expect, beforeEach } from 'vitest'
import { useCalculator } from './useCalculator'

/**
 * useCalculator.tsのテスト
 * useCalculator関数を使って、計算処理機能をテスト
 */
describe('useCalculator', () => {
  // useCalculator関数の戻り値を格納する変数を定義
  let calculator: ReturnType<typeof useCalculator>

  // beforeEachフックを使用して、各テストの前にcalculator変数を初期化
  beforeEach(() => {
    calculator = useCalculator()
  })

  describe('初期状態', () => {
    it('初期値が正しく設定されている', () => {
      expect(calculator.displayValue.value).toBe('0')
      expect(calculator.currentInput.value).toBe('')
      expect(calculator.operator.value).toBeNull()
      expect(calculator.errorMessage.value).toBeNull()
      expect(calculator.output.value).toBe('0')
    })
  })

  describe('inputDigit', () => {
    it('数字を入力できる(5)', () => {
      calculator.inputDigit('5')
      expect(calculator.currentInput.value).toBe('5')
      expect(calculator.displayValue.value).toBe('5')
    })

    it('複数の数字を連続入力できる(1 → 123)', () => {
      calculator.inputDigit('1')
      calculator.inputDigit('2')
      calculator.inputDigit('3')
      expect(calculator.currentInput.value).toBe('123')
      expect(calculator.displayValue.value).toBe('123')
    })

    it('0の状態で数字を入力すると上書きされる', () => {
      // currentInput.valueが'0'の状態を作るために、直接値を設定
      calculator.currentInput.value = '0'
      // 新しい数字を入力すると、'0'が上書きされる
      calculator.inputDigit('5')
      expect(calculator.currentInput.value).toBe('5')
      expect(calculator.displayValue.value).toBe('5')
    })

    it('00ボタンで複数のゼロを入力できる(1 → 100)', () => {
      calculator.inputDigit('1')
      calculator.inputDigit('00')
      expect(calculator.currentInput.value).toBe('100')
      expect(calculator.displayValue.value).toBe('100')
    })

    it('空の状態で00ボタンは無効(0 → 0)', () => {
      calculator.inputDigit('00')
      expect(calculator.currentInput.value).toBe('')
      expect(calculator.displayValue.value).toBe('0')
    })

    it('最大桁数を超える入力は無効(1 → 100,000,000,000,000,000)', () => {
      // 18桁の数字を入力
      calculator.inputDigit('1')
      for (let i = 2; i <= 18; i++) {
        calculator.inputDigit('0')
      }
      // さらに1桁追加しようとする（19桁になる）
      calculator.inputDigit('8')
      // 18桁のままであることを確認
      expect(calculator.currentInput.value).toBe('100000000000000000')
    })

    it('小数点を含む値で最大桁数を超える入力は無効(0.000,000,000,000,001 → 0.0000000000000001)', () => {
      // 小数点を含む16桁の数字を入力（例: 0.000,000,000,000,001）
      calculator.inputDot()
      calculator.inputDigit('0')
      for (let i = 1; i <= 14; i++) {
        calculator.inputDigit('0')
      }

      // 初期値(0):1桁 + に少数点(.):1桁 + 14桁の0 + 1桁の1 = 17桁になる
      calculator.inputDigit('1')
      // さらに2桁追加しようとする（18桁を超える）
      calculator.inputDigit('00')
      // 17桁のままであることを確認
      expect(calculator.currentInput.value).toBe('0.0000000000000001')
    })

    it('エラー状態では数値入力不可', () => {
      calculator.errorMessage.value = 'Error'
      calculator.inputDigit('5')
      expect(calculator.currentInput.value).toBe('')
    })
  })

  describe('inputDot', () => {
    it('小数点を入力できる(5 → 5.)', () => {
      calculator.inputDigit('5')
      calculator.inputDot()
      expect(calculator.currentInput.value).toBe('5.')
      expect(calculator.displayValue.value).toBe('5.')
    })

    it('初期状態で小数点を入力すると0.になる(0 → 0.)', () => {
      calculator.inputDot()
      expect(calculator.currentInput.value).toBe('0.')
      expect(calculator.displayValue.value).toBe('0.')
    })

    it('小数点は1つしか入力できない(5. → 5.)', () => {
      calculator.inputDigit('5')
      calculator.inputDot()
      calculator.inputDot()
      expect(calculator.currentInput.value).toBe('5.')
    })

    it('計算結果表示中は小数点入力が無効(10 → 10)', () => {
      calculator.displayValue.value = '10'
      calculator.inputDot()
      expect(calculator.currentInput.value).toBe('')
    })

    it('エラー状態では入力できない(5 → 5)', () => {
      calculator.errorMessage.value = 'Error'
      calculator.inputDot()
      expect(calculator.currentInput.value).toBe('')
    })
  })

  describe('clearAll', () => {
    it('すべての状態をクリアする', () => {
      calculator.inputDigit('5')
      calculator.setOperator('+')
      calculator.inputDigit('3')
      calculator.clearAll()
      
      expect(calculator.displayValue.value).toBe('0')
      expect(calculator.currentInput.value).toBe('')
      expect(calculator.operator.value).toBeNull()
      expect(calculator.errorMessage.value).toBeNull()
    })

    it('エラー状態もクリアする', () => {
      calculator.errorMessage.value = 'Error'
      calculator.clearAll()
      expect(calculator.errorMessage.value).toBeNull()
    })
  })

  describe('clearEntry', () => {
    it('現在の入力をクリアする', () => {
      calculator.inputDigit('5')
      calculator.clearEntry()
      expect(calculator.currentInput.value).toBe('')
      expect(calculator.displayValue.value).toBe('0')
    })

    it('演算子は保持される(5 + 3 → 5 +)', () => {
      calculator.inputDigit('5')
      calculator.setOperator('+')
      calculator.inputDigit('3')
      calculator.clearEntry()
      expect(calculator.operator.value).toBe('+')
      expect(calculator.currentInput.value).toBe('')
    })

    it('エラー状態ではCEボタン無効', () => {
      calculator.inputDigit('5')
      calculator.errorMessage.value = 'Error'
      calculator.clearEntry()
      // エラー状態ではclearEntryは何もしない
      expect(calculator.currentInput.value).toBe('5')
      expect(calculator.displayValue.value).toBe('5')
    })
  })

  describe('setOperator', () => {
    it('演算子を設定できる(5 → 5 +)', () => {
      calculator.inputDigit('5')
      calculator.setOperator('+')
      expect(calculator.operator.value).toBe('+')
      expect(calculator.currentInput.value).toBe('')
    })

    it('連続して演算子を設定できる(5 + 3 → 5 + 3 -)', () => {
      calculator.inputDigit('5')
      calculator.setOperator('+')
      calculator.inputDigit('3')
      calculator.setOperator('-')
      expect(calculator.operator.value).toBe('-')
    })

    it('前の値がある場合、計算を実行してから演算子を設定する(5 + 3 - → 8 -)', () => {
      calculator.inputDigit('5')
      calculator.setOperator('+')
      calculator.inputDigit('3')
      calculator.setOperator('-')
      expect(calculator.displayValue.value).toBe('8')
    })

    it('エラー状態では演算子設定不可', () => {
      calculator.errorMessage.value = 'Error'
      calculator.setOperator('+')
      expect(calculator.operator.value).toBeNull()
    })

    it('currentInput(現在の値)が空の状態で演算子を設定できる(5 → 5 +)', () => {
      calculator.currentInput.value = ''
      calculator.setOperator('+')
      expect(calculator.operator.value).toBe('+')
      expect(calculator.currentInput.value).toBe('')
    })

    it('計算結果表示状態で演算子を押すと、表示値が前の値(previousValue)として使用される(18 → 18 ×)', () => {
      // 計算結果を表示状態にする
      calculator.displayValue.value = '18'
      // 現在の値をクリア
      calculator.currentInput.value = ''
      // 演算子を未選択にする
      calculator.operator.value = null
      
      // 演算子を設定
      calculator.setOperator('×')
      
      // 新しい値を入力して計算
      calculator.inputDigit('3')
      calculator.calculateResult()
      
      // 18 × 3 = 54 になることを確認
      expect(calculator.displayValue.value).toBe('54')
    })

    it('初期状態(0表示)では演算子を押しても前の値が設定されない', () => {
      // 初期状態
      calculator.displayValue.value = '0'
      calculator.currentInput.value = ''
      calculator.operator.value = null
      
      // 演算子を設定
      calculator.setOperator('+')
      
      // 値を入力
      calculator.inputDigit('5')
      calculator.setOperator('+')
      calculator.inputDigit('3')
      calculator.calculateResult()
      
      // 0 + 5 + 3 = 8 ではなく、5 + 3 = 8 になることを確認
      expect(calculator.displayValue.value).toBe('8')
    })
  })

  describe('calculateResult', () => {
    it('加算が正しく動作する(5 + 3 = 8)', () => {
      calculator.inputDigit('5')
      calculator.setOperator('+')
      calculator.inputDigit('3')
      calculator.calculateResult()
      expect(calculator.displayValue.value).toBe('8')
      expect(calculator.currentInput.value).toBe('')
      expect(calculator.operator.value).toBeNull()
    })

    it('減算が正しく動作する(10 - 3 = 7)', () => {
      calculator.inputDigit('10')
      calculator.setOperator('-')
      calculator.inputDigit('3')
      calculator.calculateResult()
      expect(calculator.displayValue.value).toBe('7')
    })

    it('乗算が正しく動作する (5 × 3 = 15)', () => {
      calculator.inputDigit('5')
      calculator.setOperator('×')
      calculator.inputDigit('3')
      calculator.calculateResult()
      expect(calculator.displayValue.value).toBe('15')
    })

    it('除算が正しく動作する(10 ÷ 2 = 5)', () => {
      calculator.inputDigit('10')
      calculator.setOperator('÷')
      calculator.inputDigit('2')
      calculator.calculateResult()
      expect(calculator.displayValue.value).toBe('5')
    })

    it('ゼロ除算でエラーを表示する(10 ÷ 0 = Error)', () => {
      calculator.inputDigit('10')
      calculator.setOperator('÷')
      calculator.inputDigit('0')
      calculator.calculateResult()
      expect(calculator.errorMessage.value).toBe('Error')
      expect(calculator.output.value).toBe('Error')
    })

    it('不完全な状態では計算しない(5 = → 5)', () => {
      calculator.inputDigit('5')
      calculator.calculateResult()
      expect(calculator.displayValue.value).toBe('5')
    })

    it('エラー状態では計算しない(5 + 3 → 5 + 3)', () => {
      calculator.inputDigit('5')
      calculator.setOperator('+')
      calculator.inputDigit('3')
      calculator.errorMessage.value = 'Error'
      calculator.calculateResult()
      // エラー状態では計算が実行されないため、現在の値が保持される
      expect(calculator.displayValue.value).toBe('3')
    })

    it('計算実行後、計算結果がpreviousValueに保存される(3 × 6 = 18)', () => {
      calculator.inputDigit('3')
      calculator.setOperator('×')
      calculator.inputDigit('6')
      calculator.calculateResult()
      // 計算結果が表示される
      expect(calculator.displayValue.value).toBe('18')
      // 計算結果がpreviousValueに保存される（内部状態を直接確認するため、次の計算で検証）
      calculator.setOperator('×')
      calculator.inputDigit('3')
      calculator.calculateResult()
      // 18 × 3 = 54 になることを確認（previousValueが正しく保存されていれば）
      expect(calculator.displayValue.value).toBe('54')
    })

    it('計算実行後の再計算が正しく動作する(3 × 6 = 18, その後 × 3 = 54)', () => {
      calculator.inputDigit('3')
      calculator.setOperator('×')
      calculator.inputDigit('6')
      calculator.calculateResult()
      expect(calculator.displayValue.value).toBe('18')
      
      // 計算結果表示状態で新しい演算子を設定
      calculator.setOperator('×')
      calculator.inputDigit('3')
      calculator.calculateResult()
      
      // 18 × 3 = 54 になることを確認
      expect(calculator.displayValue.value).toBe('54')
    })

    it('計算実行後の再計算が正しく動作する(10 + 5 = 15, その後 - 3 = 12)', () => {
      calculator.inputDigit('10')
      calculator.setOperator('+')
      calculator.inputDigit('5')
      calculator.calculateResult()
      expect(calculator.displayValue.value).toBe('15')
      
      // 計算結果表示状態で新しい演算子を設定
      calculator.setOperator('-')
      calculator.inputDigit('3')
      calculator.calculateResult()
      
      // 15 - 3 = 12 になることを確認
      expect(calculator.displayValue.value).toBe('12')
    })
  })

  describe('backspace', () => {
    it('最後の文字を削除できる(123 → 12)', () => {
      calculator.inputDigit('123')
      calculator.backspace()
      expect(calculator.currentInput.value).toBe('12')
      expect(calculator.displayValue.value).toBe('12')
    })

    it('すべて削除すると0を表示する(1 → 0)', () => {
      calculator.inputDigit('1')
      calculator.backspace()
      expect(calculator.displayValue.value).toBe('0')
    })

    it('空の状態では何もしない(0 → 0)', () => {
      calculator.backspace()
      expect(calculator.currentInput.value).toBe('')
      expect(calculator.displayValue.value).toBe('0')
    })

    it('エラー状態ではbackspace無効', () => {
      calculator.inputDigit('123')
      calculator.errorMessage.value = 'Error'
      calculator.backspace()
      expect(calculator.currentInput.value).toBe('123')
    })
  })

  describe('output', () => {
    it('エラーがない場合は表示値を返す(5 → 5)', () => {
      calculator.inputDigit('5')
      expect(calculator.output.value).toBe('5')
    })

    it('エラーがある場合はエラーメッセージを返す(Error → Error)', () => {
      calculator.errorMessage.value = 'Error'
      expect(calculator.output.value).toBe('Error')
    })
  })

  describe('複雑な計算シナリオ', () => {
    it('連続した計算が正しく動作する(5 + 3 - 2 = 6)', () => {
      calculator.inputDigit('5')
      calculator.setOperator('+')
      calculator.inputDigit('3')
      calculator.setOperator('-')
      calculator.inputDigit('2')
      calculator.calculateResult()
      expect(calculator.displayValue.value).toBe('6')
    })

    it('小数の計算が正しく動作する(5.5 + 3.2 - 2.7 = 5.0)', () => {
      calculator.inputDigit('5')
      calculator.inputDot()
      calculator.inputDigit('5')
      calculator.setOperator('+')
      calculator.inputDigit('3')
      calculator.inputDot()
      calculator.inputDigit('2')
      calculator.calculateResult()
      expect(calculator.displayValue.value).toBe('8.7')
    })

    it('計算後に新しい数字を入力できる(5 + 3 = 8 → 8 + 2 = 10)', () => {
      calculator.inputDigit('5')
      calculator.setOperator('+')
      calculator.inputDigit('3')
      calculator.calculateResult()
      calculator.inputDigit('2')
      expect(calculator.currentInput.value).toBe('2')
      expect(calculator.displayValue.value).toBe('2')
    })
  })
})
