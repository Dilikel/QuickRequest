<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

const isAuthenticated = ref(false)
const userName = ref('')
const token = Cookies.get('token')
const isMenuOpen = ref(false)
const isLoaderVisible = ref(true)

function authenticateUser() {
	if (!token) {
		isLoaderVisible.value = false
		return
	}

	axios
		.get(`${import.meta.env.VITE_API_URL}/auth`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(response => {
			const { data } = response
			isAuthenticated.value = true
			userName.value = data.name
			isLoaderVisible.value = false
			if (data.new_access_token) {
				Cookies.set('token', data.new_access_token, { expires: 31 })
			}
		})
		.catch(error => {
			console.error('Ошибка авторизации:', error)
			isLoaderVisible.value = false
			Cookies.remove('token')
			isAuthenticated.value = false
		})
}

authenticateUser()
</script>
<template>
	<header class="header">
		<div class="container">
			<router-link to="/" class="logo"> QuickRequest </router-link>
			<div class="menu">
				<ul class="menu-list">
					<router-link to="/" class="menu-item">
						<a>Главная</a>
					</router-link>
					<li class="menu-item">
						<a>Документация</a>
					</li>
				</ul>
			</div>
			<div class="header-action">
				<div v-if="isLoaderVisible" class="loader">
					<div class="wave"></div>
				</div>
				<div class="buttons" v-else>
					<router-link v-if="!isAuthenticated" to="/login" class="login-button"
						>ВОЙТИ</router-link
					>
					<router-link v-else to="/profile" class="user">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="#fff"
							class="user-icon size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
							/>
						</svg>
						<p>{{ userName }}</p>
					</router-link>
				</div>
			</div>
			<div class="mobile-menu-btn" @click="isMenuOpen = true">
				<img src="/icons/menu-icon.svg" alt="menu-icon" />
			</div>
		</div>
	</header>

	<div
		class="header-mobile-menu"
		v-if="isMenuOpen"
		@click="isMenuOpen = false"
	></div>
	<div class="mobile-menu" :class="{ open: isMenuOpen }">
		<div class="mobile-menu-header">
			<button class="mobile-close-btn" @click="isMenuOpen = false">×</button>
		</div>
		<ul class="mobile-menu-list">
			<li class="mobile-menu-item">
				<router-link to="/" @click="isMenuOpen = false">Главная</router-link>
			</li>
			<li class="mobile-menu-item">
				<router-link to="/">Документация</router-link>
			</li>
			<router-link
				v-if="!isAuthenticated"
				to="/login"
				@click="isMenuOpen = false"
				class="mobile-menu-item mobile-start-btn"
				>Войти</router-link
			>
			<li class="mobile-menu-item" v-if="isAuthenticated">
				<router-link to="/profile" @click="isMenuOpen = false"
					>Профиль</router-link
				>
			</li>
		</ul>
	</div>
</template>

<style scoped>
.header {
	background: #121212;
	padding-top: 20px;
	padding-bottom: 20px;
	border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.container {
	display: flex;
	max-width: 1240px;
	justify-content: space-between;
	margin: 0 auto;
	align-items: center;
}

.logo {
	font-weight: bold;
	color: #fff;
	cursor: pointer;
	font-size: 28px;
	text-decoration: none;
	transition: color 0.3s ease;
}
.logo:hover {
	color: #ff8a00;
}

.menu-list {
	list-style: none;
	display: flex;
	gap: 20px;
}

.menu-item {
	display: flex;
	gap: 10px;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	color: #f0f0f0;
	font-size: 16px;
	transition: color 0.3s ease;
	text-decoration: none;
}

.menu-item:hover {
	color: #ff8a00;
}

.login-button {
	background: linear-gradient(90deg, #ff8a00, #ff6b6b);
	color: white;
	padding: 12px 30px;
	border: none;
	border-radius: 25px;
	font-size: 16px;
	cursor: pointer;
	user-select: none;
	text-decoration: none;
	transition: background 0.4s ease, transform 0.3s ease, box-shadow 0.3s ease;
	box-shadow: 0 8px 20px rgba(255, 107, 107, 0.5);
}

.login-button:hover {
	background: linear-gradient(90deg, #ff7a00, #ff5656);
	transform: translateY(-4px);
	box-shadow: 0 10px 25px rgba(255, 107, 107, 0.7);
}

.mobile-menu-btn img {
	width: 35px;
	height: 35px;
}

.mobile-menu-btn {
	display: none;
}

.user svg {
	width: 40px;
	height: 40px;
	cursor: pointer;
	transition: background 0.3s ease, transform 0.3s ease;
}

.user {
	display: flex;
	gap: 5px;
	align-items: center;
	user-select: none;
	transition: background 0.3s ease, transform 0.3s ease;
	border-radius: 10px;
	text-decoration: none;
}
.user p {
	color: white;
	font-size: 18px;
	cursor: pointer;
	padding: 5px 10px;
	border-radius: 10px;
	transition: color 0.3s ease;
}

.user p:hover {
	color: #ff8a00;
}

.loader {
	position: relative;
	width: 150px;
	height: 40px;
	background: linear-gradient(90deg, #212122, #252525);
	border-radius: 20px;
	overflow: hidden;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
}

.wave {
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		90deg,
		transparent,
		rgba(228, 137, 1, 0.3),
		transparent
	);
	animation: wave-animation 2s infinite;
	border-radius: 20px;
}

@keyframes wave-animation {
	0% {
		left: -100%;
	}
	100% {
		left: 100%;
	}
}

.buttons {
	display: flex;
	justify-content: center;
	align-items: center;
}

@media (max-width: 1024px) {
	.header {
		padding-left: 10px;
		padding-right: 10px;
	}
}

@media (max-width: 768px) {
	.start_btn {
		display: none;
	}
	.mobile-menu-btn {
		display: block;
	}
	.user {
		display: none;
	}
}

@media (max-width: 560px) {
	.start_btn {
		display: none;
	}
	.menu-list {
		display: none;
	}
	.mobile-menu-btn {
		display: block;
	}
}

.header-mobile-menu {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 998;
}

.mobile-menu {
	position: fixed;
	top: 0;
	left: 0;
	width: 70%;
	height: 100%;
	background-color: #1a1a1a;
	padding: 20px;
	transform: translateX(-100%);
	transition: transform 0.4s ease;
	z-index: 999;
}

.mobile-menu.open {
	transform: translateX(0);
}

.mobile-menu-header {
	display: flex;
	justify-content: flex-end;
}

.mobile-close-btn {
	font-size: 30px;
	color: white;
	background: none;
	border: none;
	cursor: pointer;
	transition: transform 0.3s ease;
}

.mobile-menu-list {
	list-style: none;
	margin-top: 50px;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 25px;
}

.mobile-menu-item {
	display: flex;
	align-items: center;
	gap: 10px;
	transition: background-color 0.3s ease, transform 0.3s ease;
}

.mobile-menu-item a {
	color: white;
	font-size: 20px;
	font-weight: 600;
	text-decoration: none;
	transition: color 0.3s ease;
	margin-left: 10px;
}

.mobile-start-btn {
	padding: 15px 35px;
	border-radius: 30px;
	font-size: 18px;
	cursor: pointer;
	background: linear-gradient(135deg, #ff8a00, #e4c701);
	color: white;
	font-weight: bold;
	border: none;
	box-shadow: 0 8px 15px rgba(255, 138, 0, 0.4);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
}
</style>
