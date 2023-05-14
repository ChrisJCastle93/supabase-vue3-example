<template>
	<div>
		<p>test</p>
	</div>
</template>

<script>
import { mapStores } from 'pinia'
import { useBreweryStore } from '@/stores/brewery'

export default {
	name: 'Home',
	mounted() {
		this.breweryStore.fetchBreweries()
	},
	computed: {
		...mapStores(useBreweryStore),
	},
}
</script>
