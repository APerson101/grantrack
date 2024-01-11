<script lang="ts">
	import type { Recipient } from '$lib/utils';
	import { RadioGroup, RadioItem, TabGroup } from '@skeletonlabs/skeleton';
	import PoolIncoming from './PoolIncoming.svelte';
	import Poolactivities from './Poolactivities.svelte';
	import Pooloutgoing from './Pooloutgoing.svelte';
	import Poolrecipients from './Poolrecipients.svelte';

	export let recipients: Recipient[];
	let currentSelection = 0;
</script>

<!-- categorise based on recipients, funds received and funds transfer and funds activity -->
<div>
	<TabGroup>
		<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
			<RadioItem bind:group={currentSelection} name="justify" value={0}>Recipients</RadioItem>
			<RadioItem bind:group={currentSelection} name="justify" value={1}>Incoming Funds</RadioItem>
			<RadioItem bind:group={currentSelection} name="justify" value={2}>Outgoing Funds</RadioItem>
			<RadioItem bind:group={currentSelection} name="justify" value={3}>All Activities</RadioItem>
		</RadioGroup>

		<svelte:fragment slot="panel">
			{#if currentSelection == 0}
				<Poolrecipients {recipients}></Poolrecipients>
			{:else if currentSelection == 1}
				<PoolIncoming></PoolIncoming>
			{:else if currentSelection == 2}
				<Pooloutgoing></Pooloutgoing>
			{:else}
				<Poolactivities></Poolactivities>
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
