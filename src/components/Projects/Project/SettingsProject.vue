<script setup>
import { defineEmits, ref } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const props = defineProps({
	projectId: {
		type: Number,
		required: true,
	},
})
const emit = defineEmits(['close'])
const token = Cookies.get('token')
const toast = useToast()
const project = ref({
	name: '',
	projectId: '',
})
const isLoading = ref(false)
const closeModal = () => {
	emit('close')
}

async function fetchProject() {
	await axios
		.get(`${import.meta.env.VITE_API_URL}/projects/${props.projectId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(response => {
			project.value = response.data
		})
		.catch(error => {
			console.error('Error fetching projects:', error)
			toast.error('Произошла ошибка при обновлении проекта!')
		})
}

async function saveProject() {
	isLoading.value = true
	await axios
		.patch(
			`${import.meta.env.VITE_API_URL}/projects/${props.projectId}/change/name`,
			{ newName: project.value.name },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		.then(response => {
			if (response.status === 200) {
				toast.success('Проект успешно обновлен!')
				emit('projectUpdated')
				closeModal()
			}
		})
		.catch(error => {
			console.error('Error fetching projects:', error)
			toast.error('Произошла ошибка при обновлении проекта!')
		})
		.finally(() => {
			isLoading.value = false
		})
}

fetchProject()
</script>

<template>
	<div class="settings-project">
		<div class="container" @click.stop>
			<button class="close-btn" @click="closeModal">×</button>
			<div class="title">
				<h1>Настройка проекта</h1>
			</div>
			<div class="rename">
				<input
					id="name"
					class="rename-input"
					:placeholder="project.name"
					v-model="project.name"
				/>
			</div>
			<div class="action">
				<button class="save-btn" @click="saveProject" :disabled="isLoading">
					{{ isLoading ? 'Подождите...' : 'Сохранить' }}
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.settings-project {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.6);
	backdrop-filter: blur(8px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	animation: fadeIn 0.3s ease;
}

.container {
	background: rgba(0, 0, 0, 0.7);
	padding: 40px;
	border-radius: 20px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	width: 90%;
	max-width: 450px;
	text-align: center;
	color: white;
	transition: transform 0.3s ease;
	backdrop-filter: blur(8px);
	position: relative;
	animation: slideUp 0.4s ease;
	display: flex;
	flex-direction: column;
	gap: 15px;
	align-items: center;
	justify-content: center;
}

.close-btn {
	position: absolute;
	top: 15px;
	right: 15px;
	background: none;
	border: none;
	color: white;
	font-size: 24px;
	cursor: pointer;
}

.title {
	color: white;
	font-size: 18px;
}

.rename-input {
	padding: 14px;
	border: none;
	border-radius: 10px;
	font-size: 16px;
	background-color: #2a2a2a;
	color: #ffffff;
	outline: none;
	transition: all 0.3s ease;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	width: 100%;
}

.rename {
	width: 100%;
}

.rename-input:focus {
	background-color: #1e1e1e;
	box-shadow: 0 4px 12px rgba(255, 104, 104, 0.3);
	border: 1px solid #ff6b6b;
}

.action {
	width: 100%;
}

.save-btn {
	background: linear-gradient(90deg, #ff8a00, #ff6b6b);
	color: white;
	padding: 12px 20px;
	border-radius: 15px;
	font-size: 16px;
	transition: background 0.4s ease, transform 0.3s ease, box-shadow 0.3s ease;
	box-shadow: 0 8px 20px rgba(255, 107, 107, 0.5);
	border: 0;
	width: 100%;
	cursor: pointer;
}

.save-btn:disabled {
	background: #555;
	color: #aaa;
	cursor: not-allowed;
	box-shadow: none;
}

.save-btn:hover:enabled {
	background: linear-gradient(90deg, #ff7a00, #ff5656);
	transform: translateY(-4px);
	box-shadow: 0 10px 25px rgba(255, 107, 107, 0.7);
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
