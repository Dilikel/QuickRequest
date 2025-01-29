import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', {
	state: () => ({
		isAuthenticated: false,
		user: {
			name: '',
			email: '',
		},
	}),
	actions: {
		setUser(userData) {
			this.isAuthenticated = true
			this.user = userData
		},
		logout() {
			this.isAuthenticated = false
			this.user = { name: '', email: '' }
		},
	},
	getters: {
		getUser() {
			return this.user
		},
	},
})
