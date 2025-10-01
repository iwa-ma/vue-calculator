<template>
    <div class="display">
      {{ value }}
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue'
  
  /**
   * Display.vue
   * 表示コンポーネント
   * 表示する値(value)を受け取り、表示する
   */
  export default defineComponent({
    name: 'Display',
    props: {
      value: {
        type: String as PropType<string>,
        required: true
      }
    }
  })
  </script>
  
  <style scoped>
  .display {
    height: 60px;
    background: #eee;
    font-size: 2em;
    text-align: right;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
  }
  </style>