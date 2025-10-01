<template>
  <div class="app-container min-h-screen flex items-center justify-center bg-gray-100">
    <!-- calculatorコンポーネントを表示 -->
    <Calculator />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Calculator from './components/Calculator.vue'

/**
 * App.vue
 * アプリケーションのエントリーポイント
 * 
 */
export default defineComponent({
  name: 'App',
  components: { Calculator },
})
</script>

<style></style>