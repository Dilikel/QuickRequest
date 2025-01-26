import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore('auth', () => {
	const isAuthenticated = ref(false)
	const userName = ref('')
	const isLoaderVisible = ref(false)

	function authenticateUser() {
		const token = Cookies.get('token')

		if (!token) {
			isLoaderVisible.value = false
			isAuthenticated.value = false
			return
		}

		isLoaderVisible.value = true

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
				if (data.new_access_token) {
					Cookies.set('token', data.new_access_token, { expires: 31 })
				}
			})
			.catch(error => {
				console.error('Ошибка авторизации:', error)
				Cookies.remove('token')
				isAuthenticated.value = false
			})
			.finally(() => {
				isLoaderVisible.value = false
			})
	}

	function logout() {
		Cookies.remove('token')
		isAuthenticated.value = false
		userName.value = ''
	}

	return {
		isAuthenticated,
		userName,
		isLoaderVisible,
		authenticateUser,
		logout,
	}
})
