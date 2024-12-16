<script setup>
import ResourceCard from '@/components/Projects/Resource/ResourceCard.vue'

const props = defineProps({
	items: Array,
	projectId: String,
})

const emit = defineEmits(['remove-resource'], ['settings-resource'])
</script>

<template>
	<div class="container" v-auto-animate>
		<ResourceCard
			v-for="item in items"
			:key="item.resourceId"
			:name="item.name"
			:resource-id="item.resourceId"
			:projectId="props.projectId"
			@remove-resource="$emit('remove-resource', $event)"
			@settings-resource="$emit('settings-resource', $event)"
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
