<template>
    <div>
        <Hero />
        <LogoCloud />
    </div>
</template>

<script>
import { mapState, mapStores } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import Hero from '@/components/Hero/Hero.vue'
import LogoCloud from '@/components/LogoCloud/LogoCloud.vue'

export default {
    name: 'Home',
    components: {
        Hero,
        LogoCloud,
    },
    computed: {
        ...mapStores(useAuthStore),
        ...mapState(useAuthStore, ['sessionMessage']),
    },
}
</script>