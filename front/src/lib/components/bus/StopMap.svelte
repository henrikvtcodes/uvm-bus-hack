<script lang="ts">
	import { Map, Marker, TileLayer } from 'sveaflet';
	import { createQuery } from '@tanstack/svelte-query';
	import { getStops } from 'peaktransit';
	import TestMarker from './TestMarker.svelte';
	const stopsQuery = createQuery({
		queryKey: ['stops'],
		queryFn: getStops
	});
</script>

<Map options={{ center: [44.47772, -73.1945], zoom: 16 }}>
	<TileLayer
		url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
		options={{
			maxZoom: 24,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}}
	/>
	{#if $stopsQuery.isSuccess}
		{#each $stopsQuery.data.stop as stop}
			<Marker latLng={[stop.lat, stop.lng]} />
			<TestMarker bind:stopData={stop} />
		{/each}
	{/if}
	<slot></slot>
</Map>
