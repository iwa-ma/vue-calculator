import { MAX_DIGIT } from '@/constants';

/**
 * validation.ts
 * 入力値のバリデーション関連のユーティリティ関数
 */

/**
 * 最大桁数を超えているかチェック
 * @param currentValue 現在の値
 * @param additionalDigits 追加する桁数（デフォルト: 0）
 * @returns 最大桁数を超えている場合はtrue
 */
export function isExceedingMaxDigit(currentValue: string, additionalDigits: number = 0): boolean {
  // 現在の値の桁数と追加する桁数を合計して、最大桁数を超えているかチェック
  return currentValue.length + additionalDigits >= MAX_DIGIT;
}

