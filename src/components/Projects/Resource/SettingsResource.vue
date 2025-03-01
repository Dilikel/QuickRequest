<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useToast } from 'vue-toastification'

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
	resourceId: {
		type: Number,
		required: true,
	},
})

const emit = defineEmits(['close'])
const token = Cookies.get('token')
const body = ref('')
const toast = useToast()
const isLoading = ref(false)

const closeModal = () => {
	emit('close')
}

const resource = ref({
	resourceId: '',
	name: '',
	body: [],
})

async function fetchResource() {
	await axios
		.get(
			`${import.meta.env.VITE_API_URL}/projects/${props.id}/resource/${
				props.resourceId
			}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		.then(response => {
			resource.value = response.data
			body.value = JSON.stringify(response.data.body, null, 2)
		})
		.catch(error => {
			console.error('Error fetching projects:', error)
			toast.error('Произошла ошибка при обновлении проекта!')
		})
}

async function saveResource() {
	isLoading.value = true
	await axios
		.patch(
			`${import.meta.env.VITE_API_URL}/projects/change/resource`,
			{
				projectId: props.id,
				resourceId: props.resourceId,
				resourceName: resource.value.name,
				body: JSON.parse(body.value),
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		.then(response => {
			if (response.status === 200) {
				toast.success('Ресурс успешно обновлен!')
				emit('resourceUpdated')
				closeModal()
			}
		})
		.catch(error => {
			console.log(err)
			toast.error('Произошла ошибка при обновлении ресурса!')
		})
		.finally(() => {
			isLoading.value = false
		})
}

fetchResource()
</script>

<template>
	<div class="settings-resource">
		<div class="modal-content">
			<button class="close-btn" @click="closeModal">×</button>
			<h2>Настройка ресурса</h2>
			<div class="create-header">
				<input
					type="text"
					class="input-field"
					:placeholder="resource.name"
					v-model="resource.name"
				/>
			</div>
			<div class="input-form">
				<textarea
					class="input-field json-input"
					:placeholder="body"
					v-model="body"
					required
				></textarea>
			</div>
			<button
				type="submit"
				class="submit-btn"
				@click="saveResource"
				:disabled="isLoading"
			>
				{{ isLoading ? 'Подождите...' : 'Сохранить' }}
			</button>
		</div>
	</div>
</template>

<style scoped>
.settings-resource {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	backdrop-filter: blur(10px);
	animation: fadeIn 0.3s ease;
}

.modal-content {
	background: rgba(0, 0, 0, 0.7);
	backdrop-filter: blur(8px);
	border-radius: 15px;
	padding: 30px;
	width: 90%;
	max-width: 550px;
	height: auto;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	position: relative;
	animation: slideUp 0.4s ease;
	max-height: 90vh;
	overflow-y: auto;
}

.create-header {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 15px;
	margin-bottom: 20px;
}

.header-buttons {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.header-action {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	gap: 15px;
}

.generator-btn,
.input-btn {
	border: 1px solid white;
	cursor: pointer;
	color: white;
	padding: 10px 20px;
	font-size: 18px;
	font-weight: 600;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	transition: background 0.4s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.generator-btn:hover {
	border: 1px solid #ff6b6b;
	color: #ff6b6b;
	box-shadow: 0 4px 12px rgba(255, 104, 104, 0.3);
}
.input-btn:hover {
	border: 1px solid #ff6b6b;
	color: #ff6b6b;
	box-shadow: 0 4px 12px rgba(255, 104, 104, 0.3);
}

.generator-btn:focus,
.input-btn:focus {
	outline: 2px solid #ff6b6b;
	outline-offset: 2px;
}

.close-btn {
	position: absolute;
	top: 10px;
	right: 10px;
	background: none;
	border: none;
	color: white;
	font-size: 30px;
	cursor: pointer;
}

h2 {
	font-size: 26px;
	font-weight: 600;
	color: white;
	margin-bottom: 20px;
	text-align: center;
}
h3 {
	font-size: 16px;
	font-weight: 600;
	color: white;
	text-align: center;
}

.input-field {
	padding: 14px;
	border: none;
	border-radius: 10px;
	width: 100%;
	font-size: 16px;
	background-color: #2a2a2a;
	color: #ffffff;
	outline: none;
	transition: all 0.3s ease;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.input-field:focus {
	background-color: #1e1e1e;
	box-shadow: 0 4px 12px rgba(255, 104, 104, 0.3);
	border: 1px solid #ff6b6b;
}

.json-input {
	min-height: 300px;
	resize: vertical;
}

.submit-btn {
	background: linear-gradient(90deg, #ff8a00, #ff6b6b);
	color: #fff;
	border: none;
	padding: 12px;
	border-radius: 8px;
	font-size: 16px;
	cursor: pointer;
	transition: background 0.4s ease;
	width: 100%;
	margin-top: 15px;
}

.submit-btn:disabled {
	color: #aaa;
	background: #555;
	cursor: not-allowed;
}

.submit-btn:hover:enabled {
	background: linear-gradient(90deg, #ff7a00, #ff5656);
}
@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes slideUp {
	from {
		transform: translateY(30px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
}

@media (max-width: 600px) {
	.generator-btn,
	.input-btn {
		padding: 5px 10px;
		font-size: 14px;
	}
	.modal-content {
		width: 95%;
		padding: 20px;
	}

	h2 {
		font-size: 22px;
	}

	.input-field,
	.submit-btn {
		font-size: 14px;
	}
}
</style>
