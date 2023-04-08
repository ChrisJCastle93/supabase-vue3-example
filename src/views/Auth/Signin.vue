<template>
    <div class="flex min-h-full flex-col justify-center sm:px-6 lg:px-8 mt-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company" />
            <h2 v-if="!resettingPassword" class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in
                to your account</h2>
            <h2 v-else class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Reset you password</h2>
            <p v-if="!resettingPassword" class="mt-2 text-center text-sm text-gray-600">
                Or
                {{ ' ' }}
                <a href="/auth/signup" class="font-medium text-indigo-600 hover:text-indigo-500">sign up</a>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form v-if="!successMessage" class="space-y-6" method="POST" action="#">
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div class="mt-2">
                            <input id="email" v-model="email" name="email" type="email" autocomplete="email" required
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div v-if="!resettingPassword">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div class="mt-2">
                            <input id="password" v-model="password" name="password" type="password"
                                autocomplete="current-password" required
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>


                    <div v-if="!resettingPassword" class="flex items-center justify-between">
                        <div class="text-sm">
                            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
                                @click="forgotPassword">Forgot your password?</a>
                        </div>
                    </div>

                    <div v-if="!resettingPassword">
                        <button type="submit" @click.prevent="submitForm"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><span
                                v-if="!isLoading">Sign In</span>
                            <svg v-else class="animate-spin w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                                </circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </button>
                    </div>

                    <div v-else>
                        <button  type="submit" @click.prevent="submitForgotPassword"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><span
                                v-if="!isLoading">Reset Password</span>
                            <svg v-else class="animate-spin w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                                </circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </form>

                <Transition>
                    <div v-if="error || successMessage" class="rounded-md p-2 mt-6"
                        :class="[{ 'bg-red-50': error }, { 'bg-green-50': successMessage }]">
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <ExclamationCircleIcon class="h-5 w-5"
                                    :class="[{ 'text-red-800': error }, { 'text-green-800': successMessage }]"
                                    aria-hidden="true" />
                            </div>
                            <div class="ml-3">
                                <p class="text-sm font-medium"
                                    :class="[{ 'text-red-800': error }, { 'text-green-800': successMessage }]">
                                    {{ successMessage }}
                                </p>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapStores } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'

export default {
    components: {
        ExclamationCircleIcon,
    },
    data() {
        return {
            isLoading: false,
            email: '',
            password: '',
            resettingPassword: false,
            successMessage: '',
        }
    },
    computed: {
        ...mapStores(useAuthStore),
        ...mapState(useAuthStore, ['error']),
    },
    methods: {
        submitForm() {
            this.isLoading = true;
            this.authStore.userSignin(this.email, this.password);
            this.isLoading = false;
        },
        forgotPassword() {
            this.resettingPassword = true;
        },
        submitForgotPassword() {
            this.isLoading = true;
            this.authStore.resetPassword(this.email);
            this.successMessage = 'Please check your email. We have sent you a link to reset your password';
            this.isLoading = false;
        },
    },
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/transitions.scss';
</style>