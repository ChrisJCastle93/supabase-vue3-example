import Home from '@/views/Home.vue'
import PageNotFound from '@/views/utils/PageNotFound.vue'
import Signup from '@/views/Auth/Signup.vue'
import Signout from '@/views/Auth/Signout.vue'
import Signin from '@/views/Auth/Signin.vue'
import Protected from '@/views/Protected.vue'
import { useAuthStore } from '@/stores/auth'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/auth/signup',
        name: 'signup',
        meta: { preventIfLoggedIn: true },
        component: Signup
    },
    {
        path: '/auth/signin',
        name: 'signin',
        meta: { preventIfLoggedIn: true },
        component: Signin
    },
    {
        path: '/auth/signout',
        name: 'signout',
        meta: { requiresAuth: true },
        component: Signout
    },
    {
        path: '/auth/protected',
        name: 'protected',
        meta: { requiresAuth: true },
        component: Protected
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: PageNotFound
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to) => {
    const store = useAuthStore()
    if (!store.session) await store.verifySession()
    if (!store.user) await store.getUser()
    if (to.meta.requiresAuth && !store.session) return '/auth/signin'
    if (to.meta.preventIfLoggedIn && store.session) return '/'
})

export default router;
