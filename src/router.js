import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('./pages/Home.vue'),
		meta: { layout: 'Default' },
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('./pages/Auth/Login.vue'),
		meta: { layout: 'Default' },
	},
	{
		path: '/signup',
		name: 'Signup',
		component: () => import('./pages/Auth/Signup.vue'),
		meta: { layout: 'Default' },
	},
	{
		path: '/profile',
		name: 'Profile',
		component: () => import('./pages/User/Profile.vue'),
		meta: { layout: 'Default' },
	},
	{
		path: '/projects',
		name: 'Projects',
		component: () => import('./pages/Projects.vue'),
		meta: { layout: 'Default' },
	},
	{
		path: '/projects/:id',
		name: 'Project',
		component: () => import('./pages/Project.vue'),
		props: true,
		meta: { layout: 'Default' },
	},
	{
		path: '/privacy-policy',
		name: 'PrivacyPolicy',
		component: () => import('./pages/PrivacyPolicy.vue'),
		meta: { layout: 'Default' },
	},
	{
		path: '/docs',
		name: 'Docs',
		component: () => import('./pages/Docs.vue'),
		meta: { layout: 'Default' },
	},
	{
		path: '/:catchAll(.*)',
		name: 'Error',
		component: () => import('./Error.vue'),
		meta: { layout: 'Default' },
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
