import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

export const useProjectsStore = defineStore('projects', () => {
	const items = ref([])
	const list = ref(true)
	const token = Cookies.get('token')
	const isLoaderVisible = ref(true)

	async function fetchItems() {
		await axios
			.get(`${import.meta.env.VITE_API_URL}/projects/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(response => {
				items.value = response.data
				list.value = items.value.length > 0
			})
			.catch(error => {
				console.error('Error fetching projects:', error)
			})
			.finally(() => {
				isLoaderVisible.value = false
			})
	}
	return {
		items,
		list,
		isLoaderVisible,
		fetchItems,
	}
})
