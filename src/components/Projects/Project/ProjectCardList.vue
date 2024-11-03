<script setup>
import ProjectCard from '@/components/Projects/Project/ProjectCard.vue'
defineProps({
	items: Array,
})
</script>

<template>
	<div class="container" v-auto-animate>
		<ProjectCard
			v-for="item in items"
			:key="item.projectId"
			:projectId="item.projectId"
			:projectName="item.name"
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
