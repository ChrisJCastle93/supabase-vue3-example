<template>
	<div class="flex min-h-full flex-col justify-center sm:px-6 lg:px-8">
		<div class="sm:mx-auto sm:w-full sm:max-w-md">
			<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
				Login 
			</h2>
		</div>

		<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
				<form class="space-y-3">
					<div>
						<label
							v-if="this.stage === 'tel'"
							for="tel"
							class="block text-sm font-medium leading-6 text-gray-900"
							>Mobile number</label
						>
						<label
							v-if="this.stage === 'code'"
							for="code"
							class="block text-sm font-medium leading-6 text-gray-900"
							>Enter the code that was sent to your phone</label
						>
						<div v-if="this.stage === 'tel'" class="mt-2">
							<input
								placeholder="+1 (555) 987-6543"
								id="tel"
								v-model="tel"
								name="email"
								type="tel"
								autocomplete="tel"
								required
								class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
						<div v-if="this.stage === 'code'" class="mt-2 flex items-center justify-around w-full">
							<input
								v-for="a in 6"
								maxlength="1"
								:key="a"
								class="text-center w-12 h-12 px-1 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
								type="number"
								@input="inputNumber"
								:id="a - 1"
							/>
						</div>
					</div>
					<div>
						<button
							type="submit"
							@click.prevent="submitForm"
							class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							<span v-if="!isLoading">{{ buttonCta }}</span>
							<svg
								v-else
								class="animate-spin w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						</button>
					</div>
				</form>

				<Transition>
					<div v-if="error" class="rounded-md bg-red-50 p-2 mt-6">
						<div class="flex">
							<div class="flex-shrink-0">
								<ExclamationCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
							</div>
							<div class="ml-3">
								<p class="text-sm font-medium text-red-800">{{ authStore.error }}</p>
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

String.prototype.replaceAt = function (index, replacement) {
	return this.substring(0, index) + replacement + this.substring(index + replacement.length)
}

export default {
	name: 'Signup',
	components: {
		ExclamationCircleIcon,
	},
	data() {
		return {
			isLoading: false,
			tel: '+4915730035911',
			code: '',
			digits: '230242',
			stage: 'code',
		}
	},
	computed: {
		...mapStores(useAuthStore),
		...mapState(useAuthStore, ['error']),
		buttonCta() {
			return this.stage === 'tel' ? 'Send code' : 'Verify code'
		},
	},
	methods: {
		submitForm() {
			this.isLoading = true
			if (this.stage === 'tel') {
				this.authStore.dispatchOtpTextMessage(this.tel)
				this.stage = 'code'
            } else {
                console.log(this.digits)
				this.authStore.verifyOtp(this.tel, this.digits)
			}
			this.isLoading = false
		},
		inputNumber(e) {
			this.digits = this.digits.replaceAt(e.target.id, e.target.value)
			if (this.digits.length < 6 && e.target.value !== '') {
				e.target.nextElementSibling.focus()
			}
		},
	},
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/transitions.scss';
</style>
