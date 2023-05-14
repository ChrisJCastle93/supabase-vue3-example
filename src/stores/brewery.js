import { defineStore } from 'pinia';
import BreweryService from '@/services/breweryService';
import router from '@/router/router'

export const useBreweryStore = defineStore('brewery', {
	state: () => ({
		breweries: [],
		redemptions: [],
		brewery: null,
		error: null,
	}),
	actions: {
		async getBreweries() {
			let { data, error } = await BreweryService.getBreweries();
			if (data) this.breweries = data.slice(0, data.length);
			if (error && error.message) this.setError(error.message);
		},

		async getBrewery(id) {
			let { data, error } = await BreweryService.getBrewery(id);
			if (data) this.brewery = data;
			if (error && error.message) this.setError(error.message);
		},

		async getRedemptions(role, uuid) {
			let { data, error } = await BreweryService.getRedemptions(role, uuid);
			if (data) this.redemptions = data;
			if (error && error.message) this.setError(error.message);
		},

		async claimBeer(userUuid, breweryUuid) {
			if (!userUuid || !breweryUuid) console.log('MISSING AN ID OR TWO', userUuid, breweryUuid);
			if (!userUuid) router.push('/auth/signup');
			let { data, error } = await BreweryService.claimBeer(userUuid, breweryUuid);
			if (data) console.log('CLAIMED BEER');
			if (error && error.message) this.setError(error.message);
		},

		setError(errorParam) {
			this.error = errorParam;
			setTimeout(() => {
				this.setError(null);
			}, 5000);
		},
	},
});
