/**
 * vue-shims.d.ts
 * tsファイルで、vueファイルをimport(型認識)できるようにするためのファイル
 * Vue 3 + TypeScriptプロジェクトで必要な設定ファイル
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
