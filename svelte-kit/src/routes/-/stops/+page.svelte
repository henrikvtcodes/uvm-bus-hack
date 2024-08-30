<script lang="ts">
	import Stop from '$lib/components/bus/StopCard.svelte';
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
	<div class="flex max-h-full flex-wrap space-y-2 overflow-y-scroll">
		{#each $stopsQuery.data.stop as stop}
			<Stop bind:stopData={stop} />
		{/each}
	</div>
{/if}
