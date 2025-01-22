import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Auth/Login.vue'
import Register from '@/pages/Auth/Register.vue'
import Profile from '@/pages/User/Profile.vue'
import Projects from '@/pages/Projects.vue'
import Project from '@/pages/Project.vue'
import PrivacyPolicy from './pages/PrivacyPolicy.vue'
import Error from './Error.vue'


const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: { layout: 'Default' },
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: { layout: 'Default' },
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
		meta: { layout: 'Default' },
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile,
		meta: { layout: 'Default' },
	},
	{
		path: '/projects',
		name: 'Projects',
		component: Projects,
		meta: { layout: 'Default' },
	},
	{
		path: '/projects/:id',
		name: 'Project',
		component: Project,
		props: true,
		meta: { layout: 'Default' },
	},
	{
		path: '/privacy-policy',
		name: 'PrivacyPolicy',
		component: PrivacyPolicy,
		meta: { layout: 'Default' },
	},
	{
		path: '/:catchAll(.*)',
		name: 'Error',
		component: Error,
		meta: { layout: 'Default' },
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
