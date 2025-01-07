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
const token = Cookies.get('token')

const closeModal = () => {
	emit('close')
}

const resourceName = ref('')
const mode = ref('generator')
const jsonData = ref('')
const objects = ref([{ id: 1, name: '', additionalParams: {} }])

const addObject = () => {
	objects.value.push({
		id: objects.value.length + 1,
		name: '',
		additionalParams: {},
	})
}

const removeObject = index => {
	objects.value.splice(index, 1)
}

const addAdditionalParam = index => {
	const key = prompt('Введите название параметра:')
	if (key) {
		objects.value[index].additionalParams[key] = ''
	}
}

const updateAdditionalParam = (index, key, value) => {
	objects.value[index].additionalParams[key] = value
}

const removeAdditionalParam = (index, key) => {
	delete objects.value[index].additionalParams[key]
}

const isFormValid = computed(() => {
	if (mode.value === 'generator') {
		return (
			resourceName.value.trim() !== '' &&
			objects.value.every(obj => obj.name.trim() !== '')
		)
	}
	if (mode.value === 'input') {
		try {
			JSON.parse(jsonData.value)
			return resourceName.value.trim() !== ''
		} catch {
			return false
		}
	}
})

const createResource = async () => {
	try {
		let data = ''
		if (mode.value === 'generator') {
			data = {
				projectId: props.id,
				name: resourceName.value.trim(),
				body: objects.value.map(obj => {
					const { additionalParams, ...rest } = obj
					return {
						...rest,
						...additionalParams,
					}
				}),
			}
		}
		if (mode.value === 'input') {
			let parsedBody
			try {
				parsedBody = JSON.parse(jsonData.value.trim())
			} catch (error) {
				alert('Ошибка в формате JSON. Пожалуйста, проверьте данные.')
				return
			}

			data = {
				projectId: props.id,
				name: resourceName.value.trim(),
				body: parsedBody,
			}
		}
		const response = await axios.post(
			`${import.meta.env.VITE_API_URL}/projects/create/resource`,
			data,
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
			console.error('Ошибка при создании ресурса:', response.data)
		}
	} catch (err) {
		alert('Ошибка при создании ресурса. Проверьте параметры.')
		console.error('Ошибка при создании ресурса:', err)
	}
}

const setMode = newMode => {
	mode.value = newMode
}

const generatorButtonStyle = computed(() => ({
	borderColor: mode.value === 'generator' ? '#ff6b6b' : '#fff',
	color: mode.value === 'generator' ? '#ff6b6b' : '#fff',
}))

const inputButtonStyle = computed(() => ({
	borderColor: mode.value === 'input' ? '#ff6b6b' : '#fff',
	color: mode.value === 'input' ? '#ff6b6b' : '#fff',
}))
</script>

<template>
	<div class="create-resource">
		<div class="modal-content">
			<button class="close-btn" @click="closeModal">×</button>
			<h2>Создать новый ресурс</h2>
			<div class="create-header">
				<input
					type="text"
					class="input-field"
					placeholder="Название ресурса"
					v-model="resourceName"
				/>
				<div class="header-action">
					<h3>Выберете способ создания JSON для вашего ресурса</h3>
					<div class="header-buttons">
						<div
							class="generator-btn"
							@click="setMode('generator')"
							:style="generatorButtonStyle"
						>
							Генератор
						</div>
						<div
							class="input-btn"
							@click="setMode('input')"
							:style="inputButtonStyle"
						>
							Ввести самостоятельно JSON
						</div>
					</div>
				</div>
			</div>
			<div class="form-group" v-if="mode === 'generator'">
				<div class="objects-list">
					<div
						class="object-item"
						v-for="(object, index) in objects"
						:key="index"
					>
						<div class="object-header">
							<input
								type="text"
								class="input-field object-name"
								placeholder="Имя объекта"
								v-model="object.name"
							/>
							<span class="object-id">ID: {{ object.id }}</span>
							<button class="delete-btn" @click="removeObject(index)">−</button>
						</div>
						<div class="additional-params">
							<div
								class="param-item"
								v-for="(value, key) in object.additionalParams"
								:key="key"
							>
								<input
									type="text"
									class="input-field small"
									:placeholder="key"
									v-model="object.additionalParams[key]"
									@input="
										updateAdditionalParam(index, key, $event.target.value)
									"
								/>
								<button
									class="delete-btn small"
									@click="removeAdditionalParam(index, key)"
								>
									×
								</button>
							</div>
							<button class="add-btn small" @click="addAdditionalParam(index)">
								Добавить параметр
							</button>
						</div>
					</div>
				</div>
				<button class="add-btn large" @click="addObject">
					Добавить объект
				</button>
			</div>
			<div class="input-form" v-if="mode === 'input'">
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
	font-size: 16px;
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

.form-group {
	display: flex;
	flex-direction: column;
	gap: 20px;
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

.input-field::placeholder {
	color: #bbbbbb;
}

.input-field:focus {
	background-color: #1e1e1e;
	box-shadow: 0 4px 12px rgba(255, 104, 104, 0.3);
	border: 1px solid #ff6b6b;
}

.json-input {
	min-height: 140px;
	resize: vertical;
}

.objects-list {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.object-item {
	display: flex;
	flex-direction: column;
	gap: 10px;
	background: #333;
	padding: 20px;
	border-radius: 10px;
}

.object-id {
	color: white;
}

.object-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.object-name {
	width: 70%;
}

.delete-btn {
	background: #ff4d4d;
	border: none;
	color: white;
	font-size: 20px;
	border-radius: 50%;
	cursor: pointer;
	padding: 5px 10px;
}

.add-btn {
	background: #5cb85c;
	color: white;
	border: none;
	padding: 12px;
	border-radius: 8px;
	cursor: pointer;
	font-size: 16px;
	transition: background 0.3s ease;
}

.add-btn:hover {
	background: #4cae4c;
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
