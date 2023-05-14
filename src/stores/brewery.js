import { defineStore } from 'pinia'
import BreweryService from '@/services/breweryService'
// import router from '@/router/router'

export const useBreweryStore = defineStore('brewery', {
	state: () => ({
		// user: null,
		// session: null,
		breweries: [],
		selectedBrewery: null,
		error: null,
		// sessionMessage: {
		// 	message: '',
		// 	type: '',
		// },
	}),
	actions: {
		async getBreweries() {
			let { data, error } = await BreweryService.getBreweries()
			console.log('DATA:', data)
			console.log('ERROR:', error)
			if (data.breweries) this.breweries = data.breweries
			if (error && error.message) {
				this.setError(error.message)
			}
		},

		setError(errorParam) {
			this.error = errorParam
			setTimeout(() => {
				this.setError(null)
			}, 5000)
		},

		// setSessionMessage(msg, type) {
		// 	this.sessionMessage = {
		// 		message: msg,
		// 		type,
		// 	}
		// 	setTimeout(() => {
		// 		this.sessionMessage = {
		// 			message: null,
		// 			type: null,
		// 		}
		// 	}, 5000)
		// },

		// async verifySession() {
		// 	if (!this.session) {
		// 		const { data } = await SupabaseService.verifySession()
		// 		if (data.session) this.session = data.session
		// 	}
		// },

		// async getUser() {
		// 	if (!this.user && this.session) {
		// 		const { data } = await SupabaseService.getUser()
		// 		if (data.user) this.user = data.user
		// 	}
		// },

		// async dispatchOtpTextMessage(tel) {
		// 	const { data, error } = await SupabaseService.dispatchOtpTextMessage(tel)
		// 	console.log('DATA:', data)
		// 	console.log('ERROR:', error)
		// 	if (error && error.message) {
		// 		this.setError(error.message)
		// 	}
		// },

		// async verifyOtp(tel, code) {
		// 	const { data, error } = await SupabaseService.verifyOtp(tel, code)
		// 	console.log('DATA:', data)
		// 	console.log('ERROR:', error)
		// 	if (data.user) {
		// 		this.setUser(data.user, data.session)
		// 		router.push('/auth/protected')
		// 	} else if (error && error.message) {
		// 		this.setError(error.message)
		// 	}
		// },

		// async userSignout() {
		// 	const { error } = await SupabaseService.userSignout()
		// 	this.session = null
		// 	this.user = null
		// 	if (error) {
		// 		this.setError(error)
		// 	} else {
		// 		this.setSessionMessage('You have been signed out.', 'success')
		// 		router.push('/')
		// 	}
		// },

		// resetPassword(email) {
		// 	SupabaseService.resetPassword(email)
		// },

		// async updatePassword(password) {
		// 	const { error } = await SupabaseService.updatePassword(password)
		// 	if (error) {
		// 		this.setError(error)
		// 	} else {
		// 		this.setSessionMessage('Successfully updated password. You are logged in.', 'success')
		// 		router.push('/')
		// 	}
		// },
	},
})
