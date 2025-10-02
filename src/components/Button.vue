<template>
  <button
    @click="$emit('press', label)"
    :class="[
      'font-bold rounded-full text-xl w-16 h-16 flex items-center justify-center transition-all duration-200'
    ]"
    :style="buttonStyle"
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent, type PropType, computed } from 'vue'
  
/**
 * Button.vue
 * ボタンコンポーネント
 * ボタンのラベル(label)を受け取り、表示する
 */
export default defineComponent({
  name: 'Button',
  props: {
    label: { type: String as PropType<string>, required: true }
  },
  setup(props) {
    // ラベルをもとに、ボタンのスタイルを設定
    const buttonStyle = computed(() => {
      if (['+', '-', '×', '÷', '='].includes(props.label)) {
        return {
          backgroundColor: '#ff9f0a', // オレンジ
          color: 'white' // 文字白
        }
      } else if (['CA', 'CE', 'Undo'].includes(props.label)) {
        return {
          backgroundColor: '#999999', // 中間グレー
          color: 'black' // 文字黒
        }
      } else { // 数字ボタン
        return {
          backgroundColor: '#4d4d4d', // 濃いグレー色
          color: 'white' // 文字白
        }
      }
    })
    
    return { buttonStyle }
  }
})
</script>
  
<style scoped>
button {
  border: none;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
  transform: scale(0.98);
}

button:active {
  transform: scale(0.95);
}
</style>
  