import { createClient } from '@supabase/supabase-js';

class Service {
	constructor(supabaseUrl, supabaseAnonKey) {
		this.supabase = createClient(supabaseUrl, supabaseAnonKey);
	}

	getBrewery(id) {
		return this.supabase.from('breweries').select('*').eq('id', id);
	}

	getBreweries() {
		return this.supabase.from('breweries').select('*');
	}

	getRedemptions(role, uuid) {
		const column = role === 'brewery' ? 'brewery_id' : 'user_id';
		return this.supabase.from('redemptions').select('*').eq(column, uuid);
	}
	claimBeer(userUuid, breweryUuid) {
		return this.supabase
			.from('redemptions')
			.insert([{ user_id: userUuid, brewery_id: breweryUuid }])
			.select('*');
	}
}

const BreweryService = new Service(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
);
export const breweries = BreweryService.supabase;
export default BreweryService;
