<template>
	<!-- タブレットサイズ(768px以上)の場合、幅を640pxに、それ以外の場合は320pxに設定 -->
  <div class="calculator-container bg-gray-800 p-4 md:p-8 lg:p-4 rounded-xl shadow-lg w-[320px] md:w-[640px] lg:w-[320px] mx-auto">
		<!-- Displayコンポーネントに、displayValue(表示する値)を渡す -->
		<Display :value="output" />
		<!-- KeypadコンポーネントにhandleButtonPressをカスタムイベントとして渡す -->
		<Keypad @buttonClick="handleButtonClick" />
	</div>
</template>
  
<script lang="ts">
import { defineComponent} from 'vue'
import { useCalculator } from '../composables/useCalculator'
import Display from './Display.vue'
import Keypad from './Keypad.vue'

/**
 * Calculator.vue
 * 計算機のベースコンポーネント
 * DisplayコンポーネントとKeypadコンポーネントを表示する
 */
export default defineComponent({
	name: 'Calculator',
	components: { Display, Keypad },
	setup() {
		const { output,
			inputDigit,
			inputDot,
			clearAll,
			clearEntry,
			setOperator,
			calculateResult,
			undoEntry,
		} = useCalculator()

		// ボタンが押されたときの処理
		const handleButtonClick = (label: string) => {
			// 数字ボタンの場合
      if (!isNaN(Number(label))) {
			// 入力された数字ラベルを渡してinputDigit関数を実行
        inputDigit(label)
      } else if (label === '.') {
			// 小数点ボタンの場合
        inputDot()
      } else if (label === 'CA') {
				// CAボタンの場合
        clearAll()
      } else if (label === 'CE') {
				// CEボタンの場合
        clearEntry()
			} else if (label === 'Undo') {
				// Undoボタンの場合
				undoEntry()
      } else if (['+', '-', '×', '÷'].includes(label)) {
				// 演算子ボタンの場合
        setOperator(label)
			} else if (label === '=') {
				// 計算結果ボタンの場合
				calculateResult()
      }
		}

    return { output, handleButtonClick }
	},
})
</script>
  
<style scoped>
/* Tailwind で主に制御している*/
</style>
  