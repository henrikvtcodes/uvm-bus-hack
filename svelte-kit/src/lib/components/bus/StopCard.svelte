<script lang="ts">
	import { type Stop } from 'peaktransit';
	export let stopData: Stop;

	import * as Card from '$lib/components/ui/card/index.js';
</script>

<Card.Root class=" basis-full shrink-0 grow-1">
	<Card.Header>
		<Card.Title>{stopData.longName}</Card.Title>
	</Card.Header>
	<Card.Content></Card.Content>
</Card.Root>
