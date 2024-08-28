<script lang="ts">
	import Stop from '$lib/components/bus/stop.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { getStops } from 'peaktransit';
	const stopsQuery = createQuery({
		queryKey: ['stops'],
		queryFn: getStops
	});
</script>

{#if $stopsQuery.isPending}
	Loading...
{/if}
{#if $stopsQuery.error}
	An error has occurred:
	{$stopsQuery.error.message}
{/if}
{#if $stopsQuery.isSuccess}
	<div class="flex flex-wrap space-x-2 space-y-2">
		{#each $stopsQuery.data.stop as stop}
			<Stop bind:stopData={stop} />
		{/each}
	</div>
{/if}
