<script lang="ts">
	import { type Vehicle } from 'peaktransit';
	export let vehicleData: Vehicle;

	import * as Card from '$lib/components/ui/card/index.js';
</script>

<Card.Root class="w-[350px]">
	<Card.Header>
		<Card.Title>{vehicleData.vehicleName} - {vehicleData.routeID}</Card.Title>
		<Card.Description>{vehicleData.vehicleType.split(';')[1]}</Card.Description>
	</Card.Header>
	<Card.Content></Card.Content>
</Card.Root>
