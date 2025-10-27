import Big from 'big.js'
import { MAX_DIGIT } from '@/constants'

/**
 * calculator.ts
 * 四則演算を安全に行う純粋関数
 * @param a 左辺の値
 * @param b 右辺の値
 * @param operator 演算子
 * @returns 演算結果(文字列)
 */

export function calculate(a: string, b: string, operator: string): string {
  // 受けとた左辺の値をBig.jsでインスタンス化(x,y)
  const x = new Big(a)
  const y = new Big(b)
  // 演算結果を格納する変数を定義
  let result: Big

  try {
    // 受け取った演算子によって演算を行う
    switch (operator) {
      // 加算
      case '+':
        result = x.plus(y)
        break
      // 減算
      case '-':
        result = x.minus(y)
        break
      // 乗算
      case '×':
        result = x.times(y)
        break
      // 除算
      case '÷':
        // 右辺が0の場合はエラー
        if (y.eq(0)) throw new Error('Divide by zero')
        result = x.div(y)
        break
      default:
        return 'Unknown operator'
    }

    // 結果を文字列として取得
    const resultStr = result.toString()
    
    // 桁数超えの場合はエラーを返す
    if(resultStr.length >= MAX_DIGIT){
      return 'Digit Limit Exceeded'
    }

    // 結果を文字列として返す
    return resultStr
  } catch (e) {
    return 'Error'
  }
}
