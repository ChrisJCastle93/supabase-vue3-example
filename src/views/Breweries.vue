<template>
	<div>
		<p>test</p>
	</div>
</template>

<script>
import { mapStores } from 'pinia'
import { useBreweryStore } from '@/stores/brewery'

export default {
	name: 'Breweries',
	mounted() {
		this.breweryStore.getBreweries()
	},
	computed: {
		...mapStores(useBreweryStore),
	},
}
</script>
