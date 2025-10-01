<template>
    <div class="calculator-container">
      <!-- Displayコンポーネントに、displayValue(表示する値)を渡す -->
      <Display :value="displayValue" />
      <!-- KeypadコンポーネントにhandleButtonPressをカスタムイベントとして渡す -->
      <Keypad @buttonClick="handleButtonClick" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
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
      // 表示する値に0を設定
      const displayValue = ref('0')
  
      // ボタンが押されたときの処理
      const handleButtonClick = (key: string) => {
        console.log('Pressed key:', key)
      }
  
      return { displayValue, handleButtonClick }
    },
  })
  </script>
  
  <style scoped>
  .calculator-container {
    width: 300px;
    margin: 50px auto;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
  }
  </style>
  