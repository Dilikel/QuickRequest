<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
})

const emit = defineEmits(['close'])
const create_url = `${import.meta.env.VITE_API_URL}/projects/create/resource`
const token = Cookies.get('token')
const closeModal = () => {
	emit('close')
}

const resourceName = ref('')
const jsonData = ref('')

const isFormValid = computed(() => {
	return resourceName.value.trim() !== '' && jsonData.value.trim() !== ''
})

const createResource = async () => {
	try {
		const parsedBody = JSON.parse(jsonData.value.trim())
		const response = await axios.post(
			create_url,
			{
				projectId: props.id,
				name: resourceName.value.trim(),
				body: parsedBody,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		if (response.status === 201) {
			alert('Ресурс успешно создан!')
			closeModal()
			window.location.reload()
		} else {
			console.error('Error creating resource:', response.data)
		}
	} catch (err) {
    alert('Ошибка при создании ресурса, проверьте массив с данными или имя ресурса')
		console.error('Error creating resource:', err)
	}
}
</script>

<template>
	<div class="create-resource" @click.self="closeModal">
		<div class="modal-content">
			<button class="close-btn" @click="closeModal">×</button>
			<h2>Создать новый ресурс</h2>
			<div class="form-group">
				<input
					type="text"
					class="input-field"
					placeholder="Название ресурса"
					v-model="resourceName"
					required
				/>
				<textarea
					class="input-field json-input"
					placeholder='Введите массив объектов в формате JSON, например: [{"id": 1, "name": "Object One"}, {"id": 2, "name": "Object Two"}]'
					v-model="jsonData"
					required
				></textarea>
			</div>
			<button
				type="submit"
				class="submit-btn"
				:disabled="!isFormValid"
				@click="createResource"
			>
				Создать ресурс
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

.create-resource {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
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
	max-width: 500px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	position: relative;
	animation: slideUp 0.4s ease;
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

.form-group {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

h2 {
	font-size: 24px;
	margin-bottom: 20px;
	color: white;
}

.input-field {
	padding: 14px;
	border: none;
	border-radius: 10px;
	font-size: 16px;
	background-color: #2a2a2a;
	color: #ffffff;
	outline: none;
	transition: all 0.3s ease;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.input-field::placeholder {
	color: #bbbbbb;
}

.input-field:focus {
	background-color: #1e1e1e;
	box-shadow: 0 4px 12px rgba(255, 104, 104, 0.3);
	border: 1px solid #ff6b6b;
}

.json-input {
	min-height: 120px;
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
	background: #ccc;
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
</style>
