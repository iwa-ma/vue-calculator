<template>
    <div class="keypad">
      <Button v-for="key in keys" :key="key" :label="key" @click="$emit('buttonClick', $event)" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import Button from './Button.vue'
  
  /**
   * Keypad.vue
   * キーパッドコンポーネント
   * キーボードのボタンを表示する
   */
  export default defineComponent({
    name: 'Keypad',
    components: { Button },
    setup() {
      const keys = [
        '7','8','9','÷',
        '4','5','6','×',
        '1','2','3','-', 
        '0','00','.','+',
        'CA','CE','Undo','=', 
      ]
      return { keys }
    }
  })
  </script>
  
  <style scoped>
  .keypad {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
  }
  </style>