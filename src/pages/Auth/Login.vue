<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

const email = ref('')
const password = ref('')
const message = ref('')
const isSuccess = ref(false)

async function loginUser() {
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
			message.value = 'Вы успешно вошли!'
			email.value = ''
			password.value = ''
			isSuccess.value = true
			window.location.reload()
		})
		.catch(error => {
			message.value =
				error.response?.data?.detail ||
				'Ошибка, пожалуйста проверьте пароль или Email.'
			isSuccess.value = false
		})
}

onMounted(() => {
	const token = Cookies.get('token')
	if (token) {
		isSuccess.value = true
	}
})
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
			<div class="message-error" v-if="!isSuccess && message">
				<p>{{ message }}</p>
			</div>
			<div class="success-message" v-if="isSuccess">
				<div class="icon-wrapper">
					<img
						src="/icons/success-icon.svg"
						alt="success-icon"
						class="success-icon"
					/>
				</div>
				<h2>Вы успешно вошли в аккаунт!</h2>
				<p>Добро пожаловать в <span class="brand-name">MovieLane!</span></p>
				<router-link to="/" class="cta-button">Перейти на главную</router-link>
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

.message-success,
.message-error {
	margin-top: 20px;
	padding: 10px;
	border-radius: 10px;
	text-align: center;
	font-weight: bold;
}

.message-success {
	background-color: rgba(76, 175, 80, 0.2);
	color: green;
}

.message-error {
	background-color: rgba(255, 0, 0, 0.2);
	color: red;
}

.success-message {
  background-color: #121212;
  backdrop-filter: blur(20px);
  box-shadow: 0 15px 35px rgba(25, 25, 25, 0.5);
  padding: 30px;
  text-align: center;
  border-radius: 20px;
  max-width: 400px;
  margin: auto;
  color: white;
  animation: slide-in 0.5s ease-out;
}

.icon-wrapper {
  margin-bottom: 20px;
}

.success-icon {
  width: 80px;
  height: 80px;
  animation: pop-in 0.4s ease-out;
}

h2 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 400;
}

.brand-name {
  font-weight: 700;
  color:  #ff8a00;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

.cta-button {
  padding: 12px 24px;
  background: linear-gradient(90deg, #ff8a00, #ff6b6b);
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.5);
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.4s ease;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(255, 107, 107, 0.8);
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pop-in {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
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
