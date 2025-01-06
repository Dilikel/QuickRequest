<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Loader from '@/components/Loader.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import router from '@/router'

const isAuthenticated = ref(false)
const token = Cookies.get('token')
const auth_url = `${import.meta.env.VITE_API_URL}/me`
const isLoaderVisible = ref(true)

const authenticateUser = async () => {
	if (!token) return

	try {
		const { data } = await axios.get(auth_url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		isAuthenticated.value = true
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

onMounted(async () => {
	const loadStart = Date.now()
	await authenticateUser()
	const loadDuration = Date.now() - loadStart
	const minLoadTime = 0
	const remainingTime = minLoadTime - loadDuration
	setTimeout(
		() => {
			isLoaderVisible.value = false
		},
		remainingTime > 0 ? remainingTime : 0
	)
})
</script>

<template>
	<Loader v-if="isLoaderVisible" />
	<div v-else>
		<Header />
		<router-view />
		<Footer />
	</div>
</template>

<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
</style>
