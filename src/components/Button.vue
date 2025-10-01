<template>
    <button @click="$emit('click', label)">
      {{ label }}
    </button>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue'
  
  /**
   * Button.vue
   * ボタンコンポーネント
   * ボタンのラベル(label)を受け取り、表示する
   */
  export default defineComponent({
    name: 'Button',
    props: {
      label: {
        type: String as PropType<string>,
        required: true
      }
    }
  })
  </script>
  
  <style scoped>
  button {
    width: 60px;
    height: 60px;
    margin: 2px;
    font-size: 1.5em;
  }
  </style>
  