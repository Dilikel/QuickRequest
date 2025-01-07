<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

const isAuthenticated = ref(false)
const userName = ref('')
const token = Cookies.get('token')
const isMenuOpen = ref(false)

const authenticateUser = async () => {
	if (!token) return

	try {
		const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		isAuthenticated.value = true
		userName.value = data.name

		if (data.token) {
			Cookies.set('token', data.token, { expires: 31 })
			router.push('/projects')
		}
	} catch (error) {
		console.error('Ошибка авторизации:', error)
		Cookies.remove('token')
		Cookies.remove('loginSuccess')
		isAuthenticated.value = false
	}
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
				<router-link v-if="!isAuthenticated" to="/login" class="start_btn"
					>Начать сейчас</router-link
				>
				<router-link v-if="isAuthenticated" to="/profile" class="user">
					<img src="/icons/user-icon.svg" alt="user-icon" />
					<p>{{ userName }}</p>
				</router-link>
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
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Montserrat', sans-serif;
}

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

.start_btn {
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

.start_btn:hover {
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

.user img {
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
