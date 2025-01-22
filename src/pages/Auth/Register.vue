<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

const name = ref('')
const age = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const passwordHint = ref('')
const confirmPasswordHint = ref('')
const registrationSuccess = ref(false)

async function registerUser() {
	errorMessage.value = ''
	if (password.value !== confirmPassword.value) {
		errorMessage.value = 'Пароли не совпадают'
		return
	}
	await axios
		.post(
			`${import.meta.env.VITE_API_URL}/register`,
			{
				name: name.value,
				age: age.value,
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
			registrationSuccess.value = true
			window.location.reload()
		})
		.catch(error => {
			if (error.response && error.response.data) {
				errorMessage.value =
					error.response.data.detail || 'Ошибка при регистрации'
			} else {
				errorMessage.value = 'Произошла ошибка. Попробуйте позже.'
			}
		})
}

watch(password, newPassword => {
	const hasUppercase = /[A-Z]/.test(newPassword)
	const hasLowercase = /[a-z]/.test(newPassword)
	const hasValidLength = newPassword.length >= 6

	if (!hasValidLength) {
		passwordHint.value = 'Пароль должен содержать не менее 6 символов'
	} else if (!hasUppercase || !hasLowercase) {
		passwordHint.value =
			'Пароль должен содержать строчные и заглавные латинские буквы'
	} else {
		passwordHint.value = ''
	}
})

watch(confirmPassword, newConfirmPassword => {
	if (newConfirmPassword !== password.value) {
		confirmPasswordHint.value = 'Пароли должны совпадать'
	} else {
		confirmPasswordHint.value = ''
	}
})

onMounted(() => {
	const token = Cookies.get('token')
	if (token) {
		registrationSuccess.value = true
	}
})
</script>

<template>
	<div class="register-wrapper">
		<div class="register-container" v-if="!registrationSuccess">
			<h2 class="register-title">Регистрация</h2>
			<form class="register-form" @submit.prevent="registerUser">
				<div class="inputs">
					<input
						v-model="name"
						type="text"
						placeholder="Введите ваше имя:"
						class="input-field"
						required
					/>
					<input
						v-model="age"
						type="number"
						placeholder="Введите ваш возраст:"
						class="input-field"
						required
					/>
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
					<p v-if="passwordHint" class="hint">{{ passwordHint }}</p>
					<input
						v-model="confirmPassword"
						type="password"
						placeholder="Повторите пароль:"
						class="input-field"
						required
					/>
					<p v-if="confirmPasswordHint" class="hint">
						{{ confirmPasswordHint }}
					</p>
				</div>
				<div class="error-message" v-if="errorMessage">
					<p>{{ errorMessage }}</p>
				</div>
				<button type="submit" class="submit-button">Продолжить</button>
			</form>
		</div>
		<div class="success-message" v-else>
			<div class="icon-wrapper">
				<img src="/icons/success-icon.svg" alt="success-icon" class="success-icon" />
			</div>
			<h2>Регистрация прошла успешно!</h2>
			<p>Добро пожаловать в <span class="brand-name">MovieLane!</span></p>
			<router-link to="/" class="cta-button">Перейти на главную</router-link>
		</div>
	</div>
</template>


<style scoped>
.hint {
	font-size: 14px;
	color: white;
	margin-top: -10px;
	margin-left: 15px;
}
.register-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
	background: linear-gradient(135deg, #ff8a00, #ff6b6b);
	min-height: 75vh;
}

.register-container {
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

.register-form {
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
.register-title {
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

.error-message {
  color: #ff4f4f;
  background-color: rgba(255, 0, 0, 0.1);
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
  text-align: center;
}


@media (max-width: 768px) {
	.register-container {
		padding: 30px;
	}

	.register-title {
		font-size: 28px;
	}

	.input-field {
		padding: 12px;
		font-size: 14px;
	}

	.submit-button {
		padding: 12px;
		font-size: 16px;
	}
}

@media (max-width: 480px) {
	.register-wrapper {
		padding: 30px;
	}
	.register-container {
		padding: 20px;
	}

	.register-title {
		font-size: 24px;
	}

	.input-field {
		width: 100%;
		padding: 10px;
	}

	.submit-button {
		padding: 10px;
		font-size: 14px;
	}
}
</style>
