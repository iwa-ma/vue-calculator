import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import { calculate } from '@/utils/calculator';
import { isExceedingMaxDigit } from '@/utils/validation';

/**
 * useCalculator.ts
 * 計算機の機能を提供するComposable
 * 計算機の表示、入力、演算を管理する
 */

/**
 * useCalculator関数の戻り値型定義
 */
interface UseCalculatorReturn {
  /** 表示する値 */
  displayValue: Ref<string>;
  /** 入力された値 */
  currentInput: Ref<string>;
  /** 現在の演算子 */
  operator: Ref<string | null>;
  /** エラー表示用 */
  errorMessage: Ref<string | null>;
  /** 数字ボタンが押されたときの処理 */
  inputDigit: (digit: string) => void;
  /** 小数点ボタンが押されたときの処理 */
  inputDot: () => void;
  /** CA：クリアオールボタンが押されたときの処理 */
  clearAll: () => void;
  /** CE：クリアエントリーボタンが押されたときの処理 */
  clearEntry: () => void;
  /** 演算子ボタンが押されたときの処理 */
  setOperator: (nextOp: string) => void;
  /** =(計算実行ボタン)が押されたときの処理 */
  calculateResult: () => void;
  /** Undoボタンが押されたときの処理 */
  undoEntry: () => void;
  /** 出力用（エラーがある場合はエラーを表示、そうでない場合は表示値を表示） */
  output: ComputedRef<string>;
}

export function useCalculator(): UseCalculatorReturn {
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
  function inputDigit(digit: string): void {
    // Error表示がある場合、以降の処理実行せず終了
    if (errorMessage.value) return

    // 00ボタンが押された場合の処理
    if (digit === '00') {
      // currentInputが空の場合は処理を実行しない
      if (!currentInput.value) return

      // 最大桁数を超えた場合は処理終了(00ボタンを押した後の桁数を考慮して+1)
      if(isExceedingMaxDigit(currentInput.value, 1)){
        return
      }
    }

    // 最大桁数を超えた場合は処理終了
    if(isExceedingMaxDigit(currentInput.value)){
      return
    }

    // 現在の値が0の場合の処理
    if (currentInput.value === '0') {
      // 現在の値を数字で上書き
      currentInput.value = digit
    } else {
      // 現在の値に数字を追加
      currentInput.value += digit
    }

    // 表示する値を更新
    displayValue.value = currentInput.value
  }

  /**
   * 小数点ボタンが押されたときの処理
   */
  function inputDot(): void {
    // Error表示がある場合、以降の処理実行せず終了
    if (errorMessage.value) return
    // currentInputが空の場合
    if (!currentInput.value) {
      // displayValueが計算結果表示(初期値:0以外)の場合、以降の処理実行せず終了
      if (displayValue.value !== '0') return
      // 初期状態の場合は0.を表示
      currentInput.value = '0.'
      displayValue.value = '0.'
      return
    }
    // 現在の値に、小数点がない場合は追加
    if (!currentInput.value.includes('.')) {
      currentInput.value = currentInput.value + '.'
      displayValue.value = currentInput.value
    }
  }

  /**
   * CA：クリアオールボタンが押されたときの処理
   */
  function clearAll(): void {
    // 状態を初期化する
    // 表示値を0に設定
    displayValue.value = '0'
    // 入力値を空に設定
    currentInput.value = ''
    // 演算子をnullに設定
    operator.value = null
    // 前の値をnullに設定
    previousValue.value = null
    // エラー表示をnullに設定
    errorMessage.value = null
  }

  /**
   * CE：クリアエントリーボタンが押されたときの処理
   */
  function clearEntry(): void {
    // Error表示がある場合、以降の処理実行せず終了
    if (errorMessage.value) return
    // 現在の値をクリア
    currentInput.value = ''
    // 表示値を0に設定
    displayValue.value = '0'
  }

  /**
   * 計算を実行し、エラーハンドリングを行う共通関数
   * @returns 計算結果、エラーの場合は'0'
   */
  function executeCalculation(): string {
    // calculate関数に前の値、現在の値、演算子を渡して計算実行
    const result = calculate(previousValue.value!, currentInput.value, operator.value!)
    // 計算結果がエラーの場合はエラー内容を格納して、処理終了(値は0を返す)
    if(result === 'Error' || result === 'Digit Limit Exceeded') {
      errorMessage.value = result
      return '0'
    }
    return result
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
      // 前の値があり、演算子がある場合は計算を実行
      if (previousValue.value && operator.value) {
        // 計算を先に実行
        try {
          // 計算を実行
          const result = executeCalculation()
          // 計算結果がエラーの場合は処理終了
          if (errorMessage.value) return
          // 計算結果を表示
          displayValue.value = result
        } catch (e) {
          // エラーが発生した場合はエラーを表示
          errorMessage.value = 'Error'
          return
        }
      } else {
        // 前の値がない場合は現在の値を前の値に設定
        previousValue.value = currentInput.value
      }
      // 現在の値をクリア
      currentInput.value = ''
    }
    // 演算子を更新
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
    // Error中または前の値、演算子、現在の値がない場合は無効
    if (errorMessage.value || !previousValue.value || !operator.value || !currentInput.value) return

    try {
      // 計算を実行
      const result = executeCalculation()
      // 計算結果がエラーの場合は処理終了
      if (!result) return
      // 計算結果を表示
      displayValue.value = result
      // 現在の値をクリア
      currentInput.value = ''
      // 演算子をクリア
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