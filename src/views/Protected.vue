<script>
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAuthStore } from '../stores/auth'


export default defineComponent({
    name: 'Protected',
    mounted() {
        this.authStore.verifySession();
    },
    computed: {
        ...mapStores(useAuthStore)
    },
});
</script>

<template>
    <div>
        <h1>PROTECTED PAGE</h1>
    </div>
</template>