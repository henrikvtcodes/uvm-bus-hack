<script lang="ts">
	import type StopMapType from '$lib/components/bus/StopMap.svelte';
	// import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { getStops } from 'peaktransit';
	import { Marker } from 'sveaflet';

	let StopMap: typeof StopMapType;

	onMount(async () => {
		StopMap = (await import('$lib/components/bus/StopMap.svelte')).default;
	});

	const stopsQuery = createQuery({
		queryKey: ['stops'],
		queryFn: getStops
	});
</script>

<div class="grid h-screen w-screen grid-cols-4 grid-rows-1 space-x-2 p-2">
	<div class="col-span-1 col-start-1 row-span-1 row-start-1"><slot /></div>
	<div class="col-span-3 col-start-2 row-span-1 row-start-1 rounded shadow-md">
		<svelte:component this={StopMap}></svelte:component>
	</div>
</div>
