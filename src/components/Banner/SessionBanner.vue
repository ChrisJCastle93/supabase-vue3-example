<template>
    <Transition>
        <div v-if="!dismissed"
            class="pointer-events-none fixed inset-x-0 top-10 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8 z-10">
            <div class="pointer-events-auto flex items-center justify-between gap-x-6 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5"
                :class="[{
                    'bg-red-100': sessionMessage.type === 'error',
                    'bg-green-100': sessionMessage.type === 'success',
                }]">
                <p class="text-sm leading-6 text-black">
                    {{ sessionMessage.message }}
                </p>
                <button @click="dismiss" type="button" class="-m-1.5 flex-none p-1.5">
                    <span class="sr-only">Dismiss</span>
                    <XMarkIcon class="h-5 w-5 text-black" aria-hidden="true" />
                </button>
            </div>
        </div>
    </Transition>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { mapStores, mapState } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export default {
    components: {
        XMarkIcon,
    },
    data() {
        return {
            dismissed: false,
        }
    },
    computed: {
        ...mapStores(useAuthStore),
        ...mapState(useAuthStore, ['sessionMessage']),
    },
    methods: {
        dismiss() {
            this.dismissed = true
        },
    },
}

</script>

<style>
@import '@/assets/stylesheets/transitions.scss';
</style>