<template>
    <h1>LOGOUT</h1>
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export default {
    data() {
        return {
            isLoading: false,
            email: '',
            password: '',
        }
    },
    computed: {
        ...mapStores(useAuthStore)
    },
    mounted() {
        this.authStore.userSignout();
    },
}
</script>