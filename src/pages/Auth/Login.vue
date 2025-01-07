<script setup>
import { ref, defineEmits, onMounted } from 'vue'
import axios from 'axios'
import LoginSuccess from '@/components/Login/LoginSuccess.vue'
import ErrorDisplay from '@/components/Register/ErrorDisplay.vue'
import Cookies from 'js-cookie'

const emit = defineEmits()

const email = ref('')
const password = ref('')
const message = ref('')
const isSuccess = ref(false)

onMounted(() => {
	const loginSuccess = Cookies.get('loginSuccess')
	if (loginSuccess === 'true') {
		isSuccess.value = true
	}
})

const loginUser = async () => {
	try {
		const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
			email: email.value,
			password: password.value,
		})
		const token = response.data.token
		Cookies.set('token', token, { expires: 31 })
		Cookies.set('loginSuccess', 'true', { expires: 31 })
		message.value = 'Вы успешно вошли!'
		email.value = ''
		password.value = ''
		isSuccess.value = true
		emit('userAuthenticated')
		window.location.reload()
	} catch (error) {
		message.value = error.response?.data?.detail || 'Login failed.'
		isSuccess.value = false
	}
}
</script>

<template>
	<div class="login-wrapper">
		<div class="login-container">
			<form class="login-form" v-if="!isSuccess" @submit.prevent="loginUser">
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
				<button type="submit" class="submit-button">Войти</button>
				<router-link to="/register" class="register-button"
					>Регистрация</router-link
				>
			</form>
			<ErrorDisplay v-if="!isSuccess && message" :message="message" />
			<LoginSuccess v-if="isSuccess" />
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
