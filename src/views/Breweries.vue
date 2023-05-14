<template>
	<div>
		<p>{{ user }}</p>
	</div>
</template>

<script>
import { mapStores, mapState } from 'pinia';
import { useBreweryStore } from '@/stores/brewery';
import { useAuthStore } from '@/stores/auth';

export default {
	name: 'Breweries',
	mounted() {
		// this.breweryStore.claimBeer('0f14ae87-a5a6-4060-9ba2-f8de58f39475', 'e3860d70-94fb-4c2c-9960-1c53ce7591b7');
	},
	computed: {
		...mapStores(useBreweryStore),
		...mapStores(useAuthStore),
		...mapState(useAuthStore, ['user']),
	},
};
</script>
