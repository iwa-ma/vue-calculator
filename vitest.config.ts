import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  // Vitestの設定
  test: {
    // グローバル変数(describe, it, expectなど)を使用 ※ これにより各ファイル毎のインポートを省略できる
    globals: true,
    // jsdomでブラウザ環境をシミュレート
    environment: 'jsdom',
  },
  resolve: {
    // エイリアスを設定
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})

