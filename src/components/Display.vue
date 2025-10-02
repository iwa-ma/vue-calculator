<template>
	<div class="display bg-black text-white text-2xl p-4 rounded-md mb-4 text-right font-mono overflow-x-auto">
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