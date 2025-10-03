import { ref, computed } from 'vue';
//TODO:演算処理は別ファイルで実装予定
//import { calculate } from '@/utils/calculator';

/**
 * useCalculator.ts
 * 計算機の機能を提供するComposable
 * 計算機の表示、入力、演算を管理する
 */
export function useCalculator() {
  // 表示する値
  const displayValue = ref('0'); 
  // 入力された値
  const currentInput = ref('');
  // 現在の演算子
  const operator = ref<string | null>(null);
  // 前の値
  const previousValue = ref<string | null>(null);
  // エラー表示用
  const errorMessage = ref<string | null>(null);

  /**
   * 数字ボタンが押されたときの処理
   * @param digit 押された数字
   */
  function inputDigit(digit: string) {
    // Error中は無効
    if (errorMessage.value) return

    // 桁数制限（12桁）
    if (currentInput.value.replace('.', '').length >= 12) {
      errorMessage.value = 'Digit Limit Exceeded'
      return
    }

    // 現在の値が0の場合は数字を上書き
    if (currentInput.value === '0') {
      currentInput.value = digit
    } else {
      currentInput.value += digit
    }

    displayValue.value = currentInput.value
  }

  /**
   * 小数点ボタンが押されたときの処理
   */
  function inputDot() {
    // Error中は無効
    if (errorMessage.value) return
    // 現在の値に、小数点がない場合は追加
    if (!currentInput.value.includes('.')) {
      currentInput.value = currentInput.value ? currentInput.value + '.' : '0.'
      displayValue.value = currentInput.value
    }
  }

  /**
   * CA：全クリアボタンが押されたときの処理
   */
  function clearAll() {
    // 状態を初期化する
    displayValue.value = '0'
    currentInput.value = ''
    operator.value = null
    previousValue.value = null
    errorMessage.value = null
  }

  /**
   * CE：クリアエントリボタンが押されたときの処理
   */
  function clearEntry() {
    // Error中は無効
    if (errorMessage.value) return
    // 現在の値をクリア
    currentInput.value = ''
    displayValue.value = '0'
  }

  /**
   * 演算子ボタンが押されたときの処理
   * @param nextOp 押された演算子
   */
  function setOperator(nextOp: string) {
    // Error中は無効
    if (errorMessage.value) return
    // 現在の値がある場合は、前の値と演算子をもとに計算
    if (currentInput.value) {
      if (previousValue.value && operator.value) {
        // 計算を先に実行
        try {
          const result = currentInput.value
          //TODO:演算処理は別ファイルで実装予定
          // const result = calculate(previousValue.value, currentInput.value, operator.value)
          displayValue.value = result
          previousValue.value = result
        } catch (e) {
          errorMessage.value = 'Error'
          return
        }
      } else {
        previousValue.value = currentInput.value
      }
      currentInput.value = ''
    }
    operator.value = nextOp
  }

  /**
   * Undoボタンが押されたときの処理
   */
  function undoEntry() {
    // Error中は無効
    if (errorMessage.value) return
    // 現在の値を取り消し
    currentInput.value = currentInput.value.slice(0, -1)
    // 表示値を更新(すべて取り消した場合は0を表示)
    displayValue.value = currentInput.value || '0'
  }

  /**
   * =(計算実行ボタン)が押されたときの処理
   */
  function calculateResult() {
    if (errorMessage.value || !previousValue.value || !operator.value || !currentInput.value) return

    try {
      const result = currentInput.value
      //TODO:演算処理は別ファイルで実装予定
      // const result = calculate(previousValue.value, currentInput.value, operator.value)
      displayValue.value = result
      previousValue.value = null
      currentInput.value = ''
      operator.value = null
    } catch (e) {
      errorMessage.value = 'Error'
    }
  }

  /**
   * 出力用
   * エラーがある場合はエラーを表示、そうでない場合は表示値を表示
   */
  const output = computed(() => errorMessage.value ?? displayValue.value)

  // ボタンが押されたときの処理
  return {
    displayValue,
    currentInput,
    operator,
    errorMessage,
    inputDigit,
    inputDot,
    clearAll,
    clearEntry,
    setOperator,
    calculateResult,
    undoEntry,
    output
  }
}