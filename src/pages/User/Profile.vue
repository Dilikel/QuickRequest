<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import Loader from '@/components/Loader.vue'

const router = useRouter()
const token = Cookies.get('token')
const isLoaderVisible = ref(true)
const isEditing = ref(false)

const user = ref({
	name: '',
	email: '',
})

async function fetchUserData() {
	await axios
		.get(`${import.meta.env.VITE_API_URL}/auth`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(response => {
			user.value = response.data
		})
		.catch(error => {
			console.error('Ошибка авторизации:', error)
			Cookies.remove('token')
		})
		.finally(() => {
			isLoaderVisible.value = false
		})
}

async function get_out_user() {
	try {
		Cookies.remove('token')
		router.push({ name: 'Home' }).then(() => {
			window.location.reload()
		})
	} catch (error) {
		console.error('Ошибка при выходе из аккаунта:', error)
	}
}

const toggleEditMode = () => {
	isEditing.value = !isEditing.value
}

const saveProfile = () => {
	toggleEditMode()
}

fetchUserData()
</script>

<template>
	<Loader v-if="isLoaderVisible" />
	<div class="page" v-else>
		<div class="profile">
			<div class="profile-header">
				<div class="logo-and-name">
					<img
						src="/icons/user-icon.svg"
						alt="User Avatar"
						class="profile-avatar"
					/>
					<h2 class="profile-name">{{ user.name }}</h2>
				</div>
				<div class="profile-action">
					<button class="edit-button" @click="toggleEditMode">
						{{ isEditing ? 'Отмена' : 'Изменить профиль' }}
					</button>
					<button class="get-out-btn" @click="get_out_user" v-if="!isEditing">
						Выйти
					</button>
				</div>
			</div>
			<div class="profile-details">
				<div class="profile-detail">
					<label for="name">Имя:</label>
					<input
						v-if="isEditing"
						type="text"
						v-model="user.name"
						id="name"
						class="profile-input"
					/>
					<p v-else>{{ user.name }}</p>
				</div>

				<div class="profile-detail">
					<label for="email">Email:</label>
					<input
						v-if="isEditing"
						type="email"
						v-model="user.email"
						id="email"
						class="profile-input"
					/>
					<p v-else>{{ user.email }}</p>
				</div>

				<button v-if="isEditing" @click="saveProfile" class="save-button">
					Сохранить изменения
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.page {
	min-height: 75vh;
}
.profile {
	padding: 30px;
	background-color: #121212;
	border-radius: 18px;
	max-width: 1200px;
	margin: 20px auto;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
	color: #e0e0e0;
	font-family: 'Poppins', sans-serif;
	position: relative;
	overflow: hidden;
}

.profile::before {
	content: '';
	position: absolute;
	top: -20px;
	left: -20px;
	width: 400px;
	height: 400px;
	border-radius: 50%;
	opacity: 0.3;
	z-index: 1;
}

.profile::after {
	content: '';
	position: absolute;
	bottom: -50px;
	right: -50px;
	width: 400px;
	height: 400px;
	border-radius: 50%;
	opacity: 0.3;
	z-index: 1;
}

.profile-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
	z-index: 2;
	position: relative;
}

.logo-and-name {
	display: flex;
	align-items: center;
	gap: 20px;
}

.profile-avatar {
	width: 120px;
	height: 120px;
	border-radius: 50%;
	object-fit: cover;
	border: 4px solid #333;
	box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
	user-select: none;
}

.profile-name {
	font-size: 30px;
	font-weight: 600;
	color: #fff;
}

.edit-button {
	margin-left: auto;
	background: linear-gradient(90deg, #ff8a00, #ff6b6b);
	color: white;
	padding: 10px 20px;
	border: none;
	border-radius: 30px;
	cursor: pointer;
	transition: background 0.4s ease, transform 0.3s ease, box-shadow 0.3s ease;
	box-shadow: 0 8px 20px rgba(255, 107, 107, 0.5);
	z-index: 2;
	position: relative;
	user-select: none;
}

.edit-button:hover {
	background: linear-gradient(90deg, #ff7a00, #ff5656);
	transform: translateY(-4px);
	box-shadow: 0 10px 25px rgba(255, 107, 107, 0.7);
}

.profile-action {
	display: flex;
	gap: 20px;
	justify-content: center;
	flex-direction: column;
	margin-top: 20px;
	z-index: 2;
}

.get-out-btn {
	background: red;
	color: #fff;
	padding: 10px 20px;
	border: none;
	border-radius: 30px;
	cursor: pointer;
	box-shadow: 0 2px 15px red;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	position: relative;
	font-family: 'Poppins', sans-serif;
	user-select: none;
}

.get-out-btn:hover {
	transform: translateY(-4px);
	box-shadow: 0 10px 20px darkred;
	background: darkred;
}

.get-out-btn:focus {
	outline: none;
}
.profile-details {
	background-color: #1e1e1e;
	padding: 20px;
	border-radius: 12px;
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
	z-index: 2;
	position: relative;
}

.profile-detail {
	margin-bottom: 20px;
	margin-right: 22px;
}

.profile-detail label {
	font-weight: bold;
	margin-bottom: 5px;
	display: block;
	color: #bbb;
}

.profile-detail p,
.profile-input {
	font-size: 18px;
	padding: 12px;
	border: 1px solid #333;
	border-radius: 8px;
	width: 100%;
	background-color: #1e1e1e;
	color: #e0e0e0;
}

.profile-input {
	outline: none;
	transition: border-color 0.3s;
}

.profile-input:focus {
	border-color: #ffde00;
}

.save-button {
	background: linear-gradient(90deg, #6a11cb, #2575fc);
	color: white;
	padding: 12px 20px;
	border: none;
	border-radius: 30px;
	cursor: pointer;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	z-index: 2;
	position: relative;
}

.save-button:hover {
	transform: translateY(-5px);
	box-shadow: 0 8px 20px rgba(106, 17, 203, 0.4);
}

@media (max-width: 768px) {
	.profile-header {
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.logo-and-name {
		flex-direction: column;
		gap: 10px;
	}
	.profile-avatar {
		width: 100px;
		height: 100px;
	}

	.profile-name {
		font-size: 24px;
		text-align: center;
	}

	.edit-button {
		margin-top: 10px;
		width: 100%;
	}
}
</style>
