<script setup>
import { ref, onMounted, markRaw } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const layoutComponent = ref(null)

const loadLayout = async () => {
	const layoutName = route.meta.layout || 'Default'
	try {
		const layoutModule = await import(`@/layouts/${layoutName}.vue`)
		layoutComponent.value = markRaw(layoutModule.default)
	} catch (error) {
		console.error(`Error loading layout: ${layoutName}`, error)
		layoutComponent.value = null
	}
}

onMounted(async () => {
	await loadLayout()
})
</script>

<template>
	<div>
		<component :is="layoutComponent">
			<router-view />
		</component>
	</div>
</template>
