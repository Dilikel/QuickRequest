import { useToast } from 'vue-toastification'
import Cookies from 'js-cookie'

export default function (to, from, next) {
	const toast = useToast()
	const token = Cookies.get('token')

	const protectedRoutes = ['Profile', 'Projects', 'Project']

	if (!token && protectedRoutes.includes(to.name)) {
		toast.error('Вы не авторизованы')
		return next('/login')
	}

	if ((to.path === '/login' || to.path === '/signup') && token) {
		return next('/projects')
	}

	next()
}
