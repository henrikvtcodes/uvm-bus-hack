<script lang="ts">
	import { type Stop } from 'peaktransit';
	import { onMount } from 'svelte';
	export let stopData: Stop;

	onMount(() => {
		console.log('Loaded Stop:', stopData.longName);
	});
</script>
