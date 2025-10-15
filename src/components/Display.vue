<template>
	<!-- タブレットサイズ(768px以上)の場合、フォントサイズを3xlに、それ以外の場合は2xlに設定 -->
	<div class="display bg-black text-white text-2xl md:text-3xl lg:text-2xl p-4 md:p-8 lg:p-4 rounded-md mb-4 md:mb-8 lg:mb-4 text-right font-mono overflow-x-auto">
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
/* Tailwind で主に制御している*/
</style>