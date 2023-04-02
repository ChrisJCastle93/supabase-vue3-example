import Home from '../views/Home.vue'
import Signup from '../views/auth/Signup.vue'
import Protected from '../views/Protected.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/auth/signup', name: 'signup', component: Signup },
    { path: '/auth/protected', name: 'protected', component: Protected },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
