import Home from '@/views/Home.vue'
import Breweries from '@/views/Breweries.vue'
import PageNotFound from '@/views/utils/PageNotFound.vue'
import Signup from '@/views/Auth/Signup.vue'
import Signout from '@/views/Auth/Signout.vue'
import Signin from '@/views/Auth/Signin.vue'
import ResetPassword from '@/views/Auth/ResetPassword.vue'
import Protected from '@/views/Protected.vue'
import { useAuthStore } from '@/stores/auth'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/breweries',
		name: 'breweries',
		component: Breweries,
	},
	{
		path: '/auth/signup',
		name: 'signup',
		meta: { preventIfLoggedIn: true },
		component: Signup,
	},
	{
		path: '/auth/signin',
		name: 'signin',
		meta: { preventIfLoggedIn: true },
		component: Signin,
	},
	{
		path: '/auth/signout',
		name: 'signout',
		meta: { requiresAuth: true },
		component: Signout,
	},
	{
		path: '/auth/protected',
		name: 'protected',
		meta: { requiresAuth: true },
		component: Protected,
	},
	{
		path: '/auth/reset-password',
		name: 'reset-password',
		meta: { requiresAuth: true },
		component: ResetPassword,
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		component: PageNotFound,
	},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to) => {
    const store = useAuthStore()
    if (to.meta.requiresAuth) {
        if (!store.session) await store.verifySession()
        if (!store.user) await store.getUser()
        if (!store.session) return '/auth/signin'
    }
    if (to.meta.preventIfLoggedIn) {
        if (!store.session) await store.verifySession()
        if (!store.user) await store.getUser()
        if (store.session) return '/'
    }
})

export default router;
