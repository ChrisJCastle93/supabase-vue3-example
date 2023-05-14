import { createClient } from '@supabase/supabase-js'

class Service {
	constructor(supabaseUrl, supabaseAnonKey) {
		this.supabase = createClient(supabaseUrl, supabaseAnonKey)
	}

	getBreweries() {
		return this.supabase.from('breweries').select('*')
	}

	// userSignout() {
	// 	return this.supabase.auth.signOut()
	// }

	// getUser() {
	// 	return this.supabase.auth.getUser()
	// }

	// resetPassword(email) {
	// 	return this.supabase.auth.resetPasswordForEmail(email, {
	// 		redirectTo: 'localhost:5178/',
	// 	})
	// }

	// updatePassword(password) {
	// 	console.log('SERVICE UPDATING PW:', password)
	// 	return this.supabase.auth.updateUser({ password })
	// }
}

const BreweryService = new Service(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
)
export const breweries = BreweryService.supabase
export default BreweryService
