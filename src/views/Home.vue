<template>
    <div>
        <Hero />
        <LogoCloud />
        <Features />
        <Pricing />
        <CallToAction />
    </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import Hero from '@/components/Hero/Hero.vue'
import Pricing from '@/components/Pricing/Pricing.vue'
import Features from '@/components/Features/Features.vue'
import LogoCloud from '@/components/LogoCloud/LogoCloud.vue'
import CallToAction from '@/components/CallToAction/CallToAction.vue'

export default {
    name: 'Home',
    components: {
        Hero,
        LogoCloud,
        Pricing,
        Features,
        CallToAction,
    },
    computed: {
        ...mapStores(useAuthStore),
    },
}
</script>