<script setup>
import { defineProps } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import router from '@/router.js'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const props = defineProps({
	id: {
		type: Number,
		required: true,
	},
	resourceId: {
		type: Number,
		required: true,
	},
})

const emit = defineEmits(['close'])
const token = Cookies.get('token')
const resRouter = useRouter()
const toast = useToast()

const closeModal = () => {
	emit('close')
}

const removeResource = async () => {
	try {
		const response = await axios.delete(
			`${import.meta.env.VITE_API_URL}/projects/remove/${props.id}/resource/${
				props.resourceId
			}/`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		if (response.status === 200) {
			resRouter.push({ name: 'Project', params: { id: props.id } })
			localStorage.setItem('resourceRemoved', 'true')
			resRouter.go()
		}
	} catch (error) {
		console.error('Ошибка при удалении ресурса:', error)
		toast.error('Ошибка при удалении ресурса:', error)
	}
}
</script>

<template>
	<div class="remove-resource-overlay">
		<div class="remove-resource-modal" @click.stop>
			<h3>Вы уверены, что хотите удалить ресурс?</h3>
			<div class="actions">
				<button class="remove-btn" @click="removeResource">Да</button>
				<button class="back-btn" @click="closeModal">Отмена</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.remove-resource-overlay {
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

.remove-resource-modal {
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

.back-btn {
	background-color: #555;
}

.back-btn:hover {
	background-color: #444;
}

@media (max-width: 768px) {
	.remove-resource-modal {
		padding: 30px;
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
	.remove-btn,
	.back-btn {
		font-size: 13px;
		padding: 6px 12px;
	}
}
</style>
