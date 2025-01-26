<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const email = ref('')
const password = ref('')
const message = ref('')
const router = useRouter()
const toast = useToast()
const isLoading = ref(false)
const authStore = useAuthStore()

async function loginUser() {
	isLoading.value = true
	await axios
		.post(
			`${import.meta.env.VITE_API_URL}/login`,
			{
				email: email.value,
				password: password.value,
			},
			{
				headers: {
					'x-api-password': import.meta.env.VITE_API_PASSWORD,
				},
			}
		)
		.then(response => {
			const token = response.data.token
			Cookies.set('token', token, { expires: 31 })
			email.value = ''
			password.value = ''
			authStore.authenticateUser()
			router.push({ name: 'Projects' })
			toast.success('Вы успешно вошли!')
		})
		.catch(error => {
			message.value =
				error.response?.data?.detail || 'Ошибка. Проверьте Email и пароль.'
			toast.error(message.value)
		})
		.finally(() => {
			isLoading.value = false
		})
}

onMounted(() => {
	const token = Cookies.get('token')
	if (token) {
		router.push({ name: 'Projects' })
	}
})
</script>

<template>
	<div class="login-wrapper">
		<div class="login-container">
			<form class="login-form" @submit.prevent="loginUser">
				<h2 class="login-title">Вход</h2>
				<div class="inputs">
					<input
						v-model="email"
						type="email"
						placeholder="Email:"
						class="input-field"
						required
					/>
					<input
						v-model="password"
						type="password"
						placeholder="Пароль:"
						class="input-field"
						required
					/>
				</div>
				<button type="submit" class="submit-button" :disabled="isLoading">
					{{ isLoading ? 'Загрузка...' : 'Войти' }}
				</button>
				<router-link to="/signup" class="register-button"
					>Регистрация</router-link
				>
			</form>
			<div class="message-error" v-if="message">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M12 0C5.371 0 0 5.372 0 12s5.371 12 12 12 12-5.372 12-12S18.629 0 12 0zM13.5 18h-3v-3h3v3zm0-6h-3V6h3v6z"
					/>
				</svg>
				<p>{{ message }}</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.login-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
	background: linear-gradient(135deg, #ff8a00, #ff6b6b);
	min-height: 75vh;
}

.login-container {
	background-color: #121212;
	backdrop-filter: blur(20px);
	border-radius: 30px;
	padding: 50px;
	box-shadow: 0 15px 35px rgba(25, 25, 25, 0.6);
	max-width: 450px;
	width: 100%;
	transition: transform 0.3s ease;
	color: #ffffff;
}

.login-form {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 25px;
}

.inputs {
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 100%;
}

.login-title {
	font-size: 36px;
	font-weight: bold;
	color: white;
	text-align: center;
	text-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
	margin-bottom: 25px;
}

.input-field {
	width: 100%;
	padding: 15px;
	border: none;
	border-radius: 30px;
	background-color: #2c2c2c;
	box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.4);
	font-size: 16px;
	color: #fff;
	transition: background-color 0.3s ease;
}

.input-field::placeholder {
	color: #b8b8b8;
}

.input-field:focus {
	background-color: #4a4a4a;
	outline: none;
}

.submit-button {
	width: 100%;
	padding: 15px;
	background: linear-gradient(90deg, #ff8a00, #ff6b6b);
	border: none;
	border-radius: 30px;
	color: white;
	font-size: 18px;
	font-weight: bold;
	cursor: pointer;
	transition: transform 0.3s ease, box-shadow 0.4s ease;
	box-shadow: 0 8px 20px rgba(255, 107, 107, 0.5);
}

.submit-button:hover {
	transform: translateY(-3px);
	box-shadow: 0 12px 24px rgba(255, 107, 107, 0.8);
}

.register-button {
	width: 100%;
	user-select: none;
	padding: 15px;
	background: transparent;
	border: 2px solid white;
	border-radius: 30px;
	color: white;
	font-size: 18px;
	font-weight: bold;
	text-align: center;
	text-decoration: none;
	transition: background-color 0.4s ease, transform 0.3s ease,
		box-shadow 0.4s ease;
	margin-top: 10px;
}

.register-button:hover {
	background: linear-gradient(90deg, #ff8a00, #ff6b6b);
	transform: translateY(-3px);
	box-shadow: 0 12px 24px rgba(255, 107, 107, 0.8);
	border-color: transparent;
}

.message-error {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 15px;
	margin-top: 20px;
	padding: 15px 20px;
	border-radius: 15px;
	text-align: center;
	font-weight: bold;
	background: #ff5252;
	box-shadow: 0 8px 20px rgba(255, 0, 0, 0.4),
		inset 0 4px 6px rgba(255, 255, 255, 0.1);
	color: white;
	animation: fadeIn 0.5s ease-in-out;
}

.message-error svg {
	width: 30px;
	height: 30px;
	flex-shrink: 0;
	fill: white;
}

.message-error p {
	font-size: 16px;
	line-height: 1.5;
	margin: 0;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@media (max-width: 768px) {
	.login-container {
		padding: 30px;
	}

	.login-title {
		font-size: 28px;
	}

	.input-field {
		padding: 12px;
		font-size: 14px;
	}

	.submit-button,
	.register-button {
		padding: 12px;
		font-size: 16px;
	}

	.login-wrapper {
		padding: 10px;
	}
}

@media (max-width: 480px) {
	.login-wrapper {
		padding: 30px;
	}
	.login-container {
		padding: 20px;
	}

	.login-title {
		font-size: 24px;
	}

	.input-field {
		width: 100%;
		padding: 10px;
	}
}
</style>
