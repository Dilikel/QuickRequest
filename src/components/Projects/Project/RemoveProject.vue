<script setup>
import { defineProps, ref } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const props = defineProps({
	id: {
		type: Number,
		required: true,
	},
})

const emit = defineEmits(['close'])
const toast = useToast()
const token = Cookies.get('token')
const router = useRouter()
const isLoading = ref(false)

const closeModal = () => {
	emit('close')
}

async function removeProject() {
	isLoading.value = true
	await axios
		.delete(`${import.meta.env.VITE_API_URL}/projects/remove/${props.id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(response => {
			if (response.status === 200) {
				closeModal()
				router.push({ name: 'Projects' })
				toast.success('Проект успешно удален!')
			}
		})
		.catch(error => {
			console.error('Ошибка при удалении проекта:', error)
			toast.error(
				'Ошибка при удалении проекта: ' +
					(err.response?.data?.message || 'Попробуйте снова.')
			)
		})
		.finally(() => {
			isLoading.value = false
		})
}
</script>

<template>
	<div class="remove-project">
		<div class="container">
			<div class="card">
				<h3>Вы уверены, что хотите удалить проект?</h3>
				<div class="actions">
					<button
						class="remove-btn"
						@click="removeProject"
						:disabled="isLoading"
					>
						{{ isLoading ? 'Подождите...' : 'Да' }}
					</button>
					<button class="back-btn" @click="closeModal">Отмена</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	align-items: center;
	justify-content: center;
}

.remove-project {
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

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.card {
	background-color: #121212;
	padding: 40px;
	border-radius: 20px;
	box-shadow: 0 15px 35px rgba(25, 25, 25, 0.6);
	width: 90%;
	max-width: 450px;
	text-align: center;
	color: white;
	transition: transform 0.3s ease;
}

.actions {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
	margin-top: 20px;
}

.remove-btn,
.back-btn {
	background-color: #ff4d4d;
	border: none;
	color: white;
	padding: 10px 20px;
	border-radius: 10px;
	cursor: pointer;
	font-size: 16px;
	transition: background-color 0.3s ease;
}

.remove-btn:hover {
	background-color: #e04343;
}
.remove-btn:disabled {
	background: #555;
	color: #aaa;
	cursor: not-allowed;
	box-shadow: none;
}

.back-btn {
	background-color: #555;
}

.back-btn:hover {
	background-color: #444;
}

@media (max-width: 768px) {
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.card {
		padding: 30px;
		max-width: 90%;
		border-radius: 15px;
	}

	.actions {
		gap: 15px;
	}

	.remove-btn,
	.back-btn {
		font-size: 14px;
		padding: 8px 16px;
		border-radius: 8px;
	}
}

@media (max-width: 480px) {
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.remove-btn,
	.back-btn {
		font-size: 13px;
		padding: 6px 12px;
	}
}
</style>
