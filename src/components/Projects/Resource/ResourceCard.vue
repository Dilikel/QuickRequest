<script setup>
const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	resourceId: {
		type: String,
		required: true,
	},
	projectId: {
		type: String,
		required: true,
	},
})

const resource_url = `${import.meta.env.VITE_API_URL}/projects/${
	props.projectId
}/${props.name}/`

const emit = defineEmits(['remove-resource'])

const handleRemove = () => {
	emit('remove-resource', props.resourceId)
}

const openResourceUrl = () => {
	window.open(resource_url, '_blank')
}
</script>

<template>
	<div class="resource-card">
		<div class="name-and-id">
			<div class="name" @click="openResourceUrl">
				/{{ props.name }}
				<img src="/icons/link-icon.svg" alt="link" />
			</div>
			<div class="id">ID: {{ props.resourceId }}</div>
		</div>
		<div class="actions">
			<button class="settings-btn" aria-label="Settings">
				<img src="/icons/settings-icon.svg" alt="settings" />
			</button>
			<button class="delete-btn" aria-label="Delete" @click="handleRemove">
				<img src="/icons/delete-icon.svg" alt="delete" />
			</button>
		</div>
	</div>
</template>

<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Montserrat', sans-serif;
}

.resource-card {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	background-color: #2c2c2c;
	border-radius: 15px;
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	cursor: pointer;
}

.resource-card:hover {
	transform: translateY(-2px);
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.name {
	display: flex;
	align-items: center;
	gap: 5px;
	color: white;
	transition: transform 0.3s ease;
}

.name img {
	width: 15px;
	height: 15px;
	margin-bottom: 2px;
  user-select: none;
}

.name:hover {
	transform: translateY(-4px);
}

.actions {
	display: flex;
	align-items: center;
	gap: 10px;
}

.actions img {
	width: 30px;
	height: 30px;
}

.settings-btn,
.delete-btn {
	background: transparent;
	border: none;
	cursor: pointer;
	transition: transform 0.3s ease;
  user-select: none;
}

.settings-btn:hover,
.delete-btn:hover {
	transform: translateY(-4px);
}

.name-and-id {
	display: flex;
	flex-direction: column;
	gap: 5px;
}
.id {
	font-size: 14px;
	color: #b3b3b3;
}
</style>
