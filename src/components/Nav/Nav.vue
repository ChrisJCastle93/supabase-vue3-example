<template>
    <header class="absolute inset-x-0 top-0 z-50">
        <Banner />
        <SessionBanner v-if="sessionMessage.message" />
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div class="flex lg:flex-1">
                <a href="#" class="-m-1.5 p-1.5">
                    <span class="sr-only">Your Company</span>
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </a>
            </div>
            <div class="flex lg:hidden">
                <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    @click="mobileMenuOpen = true">
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div class="hidden lg:flex lg:gap-x-12">
                <a v-for="item in navigation" :key="item.name" :href="item.href"
                    class="text-sm font-semibold leading-6 text-gray-900">{{ item.name }}</a>
            </div>
            <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                <a v-if="!session" href="/auth/signin" class="text-sm font-semibold leading-6 text-gray-900">Sign in <span
                        aria-hidden="true">&rarr;</span></a>
                <a v-if="session" href="/auth/signout" class="text-sm font-semibold leading-6 text-gray-900">Sign out <span
                        aria-hidden="true">&rarr;</span></a>
            </div>
        </nav>
        <DialogTW as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
            <div class="fixed inset-0 z-50" />
            <DialogPanel
                class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div class="flex items-center justify-between">
                    <a href="#" class="-m-1.5 p-1.5">
                        <span class="sr-only">Your Company</span>
                        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="" />
                    </a>
                    <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                        <span class="sr-only">Close menu</span>
                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-500/10">
                        <div class="space-y-2 py-6">
                            <a v-for="item in navigation" :key="item.name" :href="item.href"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
                        </div>
                        <div class="py-6">
                            <a href="/auth/signin"
                                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Sign
                                in</a>
                        </div>
                    </div>
                </div>
            </DialogPanel>
        </DialogTW>
    </header>
</template>

<script>
import { Dialog as DialogTW, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import Banner from '@/components/Banner/Banner.vue'
import SessionBanner from '@/components/Banner/SessionBanner.vue'
import { mapStores, mapState } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export default {
    components: {
        Banner,
        SessionBanner,
        DialogTW,
        DialogPanel,
        Bars3Icon,
        XMarkIcon,
    },
    data() {
        return {
            navigation: [
                { name: 'Product', href: '#' },
                { name: 'Features', href: '#' },
                { name: 'Marketplace', href: '#' },
                { name: 'Company', href: '#' },
            ],
            mobileMenuOpen: false,
        }
    },
    computed: {
        ...mapStores(useAuthStore),
        ...mapState(useAuthStore, ['sessionMessage', 'session']),
    },
}
</script>