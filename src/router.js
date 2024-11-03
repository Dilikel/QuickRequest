import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Auth/Login.vue'
import Register from '@/pages/Auth/Register.vue'
import Profile from '@/pages/User/Profile.vue'
import Projects from '@/pages/Projects.vue'
import Project from '@/pages/Project.vue'
import Cookies from 'js-cookie'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: { requiresAuth: false },
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile,
		meta: { requiresAuth: true },
	},
	{
		path: '/projects',
		name: 'Projects',
		component: Projects,
		meta: { requiresAuth: true },
	},
	{
		path: '/projects/:id',
		name: 'Project',
		component: Project,
		props: true,
		meta: { requiresAuth: true },
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	const token = Cookies.get('token')
	const isAuthenticated = !!token
	if (isAuthenticated && to.name === 'Home') {
		next({ name: 'Projects' })
	} else if (to.meta.requiresAuth && !isAuthenticated) {
		next({ name: 'Login' })
	} else {
		next()
	}
})

export default router
