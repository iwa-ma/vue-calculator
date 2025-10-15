<template>
	<!-- タブレットサイズ(768px以上)の場合、グリッドの列数を4に、それ以外の場合2に設定 -->
  <div class="grid grid-cols-4 gap-2 md:gap-4 lg:gap-2">
		<Button
			v-for="key in keys"
			:key="key"
			:label="key"
			@press="$emit('buttonClick', $event)"
		/>
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
/* Tailwind で主に制御している*/
</style>
  