<script lang="ts">
	import Vehicle from '$lib/components/bus/VehicleCard.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { getVehicles } from 'peaktransit';
	const busesQuery = createQuery({
		queryKey: ['buses'],
		queryFn: getVehicles
	});
</script>

{#if $busesQuery.isPending}
	Loading...
{/if}
{#if $busesQuery.error}
	An error has occurred:
	{$busesQuery.error.message}
{/if}
{#if $busesQuery.isSuccess}
	<div class="flex flex-wrap space-x-2 space-y-2">
		{#each $busesQuery.data.vehicles as bus}
			<Vehicle bind:vehicleData={bus} />
		{/each}
	</div>
{/if}
