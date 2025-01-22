<script setup>
import Loader from '@/components/Loader.vue'
import { ref, onMounted, markRaw } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Cookies from 'js-cookie'
import router from '@/router'

const isAuthenticated = ref(false)
const token = Cookies.get('token')
const isLoaderVisible = ref(true)
const route = useRoute()
const layoutComponent = ref(null)

async function authenticateUser() {
	if (!token) {
		isLoaderVisible.value = false
		return
	}
	await axios
		.get(`${import.meta.env.VITE_API_URL}/auth`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(response => {
			isLoaderVisible.value = false
			if (response.data.new_access_token) {
				Cookies.set('token', data.new_access_token, { expires: 31 })
			}
			router.push('/projects')
		})
		.catch(error => {
			console.error('Ошибка авторизации:', error)
			Cookies.remove('token')
			isAuthenticated.value = false
			isLoaderVisible.value = false
		})
}

const loadLayout = async () => {
	const layoutName = route.meta.layout || 'Default'
	try {
		const layoutModule = await import(`@/layouts/${layoutName}.vue`)
		layoutComponent.value = markRaw(layoutModule.default)
	} catch (error) {
		console.error(`Error loading layout: ${layoutName}`, error)
		layoutComponent.value = null
	}
}

onMounted(async () => {
	await loadLayout()
	await authenticateUser()
})
</script>

<template>
	<Loader v-if="isLoaderVisible" />
	<div v-else>
		<component :is="layoutComponent">
			<router-view />
		</component>
	</div>
</template>
