<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import Chart from 'chart.js/auto';
	import { LucideArrowDown01, LucideArrowUp01 } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';

	let portfolio: any;
	export let dataSet: any[];
	export let label: string;
	$: outerWidth = 0;
	$: outerHeight = 0;

	let config: any = {
		type: 'bar',
		data: {
			labels: dataSet.map((each) => each.x),
			datasets: [
				{
					label: label,
					data: dataSet.map((each) => each.y),
					borderWidth: 1
				}
			]
		}
	};
	function displayChart() {
		new Chart(portfolio.getContext('2d'), config);
	}
	onMount(() => {
		displayChart();
	});

	onDestroy(() => {
		console.log('object destroyed');
	});

	const handleToggle = (
		event: CustomEvent<{
			event?: Event | undefined;
			id: string;
			panelId: string;
			open: boolean;
			autocollapse: boolean;
		}>
	) => {
		console.log('testing');
		event.detail.open ? displayChart() : null;
	};
</script>

<svelte:window bind:outerWidth bind:outerHeight />
<Accordion>
	<AccordionItem open on:toggle={handleToggle}>
		<svelte:fragment slot="iconOpen"><LucideArrowDown01></LucideArrowDown01></svelte:fragment>
		<svelte:fragment slot="iconClosed"><LucideArrowUp01></LucideArrowUp01></svelte:fragment>
		<svelte:fragment slot="summary">Vizualisation</svelte:fragment>
		<svelte:fragment slot="content">
			<div class="h-[40vh] w-full">
				<canvas bind:this={portfolio} />
			</div>
		</svelte:fragment>
	</AccordionItem>
</Accordion>
