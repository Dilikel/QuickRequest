<script setup>
import { ref, watch } from 'vue'
import { defineEmits } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

const projectName = ref('')
const isCreateButtonDisabled = ref(true)
const emit = defineEmits(['close'])
const create_url = `${import.meta.env.VITE_API_URL}/projects/create`
const token = Cookies.get('token')
const router = useRouter()

const closeModal = () => {
	emit('close')
}

const createProject = async () => {
	try {
		const response = await axios.post(
			create_url,
			{
				projectname: projectName.value,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)

		if (response.status === 201) {
			alert('Проект успешно создан!')
			closeModal()
			router.go()
		}
	} catch (err) {
		console.error('Error creating project:', err)
		alert(
			'Ошибка при создании проекта: ' +
				(err.response?.data?.message || 'Попробуйте снова.')
		)
	}
}

watch(projectName, newValue => {
	isCreateButtonDisabled.value = newValue.trim() === ''
})
</script>

<template>
	<div class="overlay">
		<div class="modal" @click.stop>
			<h2 class="modal-title">Создать новый проект</h2>
			<input
				type="text"
				v-model="projectName"
				placeholder="Введите название проекта"
				class="project-input"
			/>
			<div class="buttons">
				<button
					class="create-button"
					@click="createProject"
					:disabled="isCreateButtonDisabled"
				>
					Создать проект
				</button>
				<button class="cancel-button" @click="closeModal">Отмена</button>
			</div>
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

.overlay {
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

.modal {
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
}
@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.modal-title {
	font-size: 32px;
	font-weight: bold;
	color: #fff;
	margin-bottom: 20px;
	text-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
}

.project-input {
	width: 100%;
	padding: 15px;
	margin-bottom: 20px;
	border: none;
	border-radius: 10px;
	font-size: 16px;
	background-color: #2a2a2a;
	color: #ffffff;
	text-align: center;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease;
	outline: none;
}

.project-input::placeholder {
	color: #b8b8b8;
}

.project-input:focus {
	background-color: #4a4a4a;
	outline: none;
}

.buttons {
	display: flex;
	gap: 15px;
	justify-content: center;
}

.create-button,
.cancel-button {
	padding: 15px 20px;
	font-size: 18px;
	border-radius: 30px;
	border: none;
	cursor: pointer;
	transition: transform 0.3s ease, box-shadow 0.4s ease;
}

.create-button {
	background: linear-gradient(90deg, #ff8a00, #ff6b6b);
	color: white;
	box-shadow: 0 8px 20px rgba(255, 107, 107, 0.5);
}

.create-button:disabled {
	background: #555;
	color: #aaa;
	cursor: not-allowed;
	box-shadow: none;
}

.create-button:hover:not(:disabled) {
	transform: translateY(-3px);
	box-shadow: 0 12px 24px rgba(255, 107, 107, 0.8);
}

.cancel-button {
	background: #444;
	color: #ddd;
}

.cancel-button:hover {
	background: #555;
	transform: translateY(-3px);
}

@media (max-width: 768px) {
	.modal {
		padding: 30px;
	}

	.modal-title {
		font-size: 28px;
	}

	.project-input {
		font-size: 14px;
		padding: 12px;
	}

	.create-button,
	.cancel-button {
		padding: 12px;
		font-size: 16px;
	}
}

@media (max-width: 480px) {
	.modal {
		padding: 20px;
	}

	.modal-title {
		font-size: 24px;
	}

	.project-input {
		padding: 10px;
	}

	.create-button,
	.cancel-button {
		padding: 10px;
		font-size: 14px;
	}
}
</style>
