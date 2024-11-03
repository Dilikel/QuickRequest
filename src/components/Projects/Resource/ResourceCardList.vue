<script setup>
import ResourceCard from '@/components/Projects/Resource/ResourceCard.vue'

defineProps({
	items: Array,
})
</script>

<template>
	<div class="container" v-auto-animate>
		<ResourceCard
			v-for="item in items"
			:key="item.resourceId"
			:name="item.name"
			:resource-id="item.resourceId"
		/>
	</div>
</template>

<style scoped>
.container {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding-top: 20px;
}
</style>
