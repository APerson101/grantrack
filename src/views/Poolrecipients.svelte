<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Recipient } from '$lib/utils';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import Paginatedtable from './components/Paginatedtable.svelte';
	import Visualization from './visualization/Visualization.svelte';

	export let recipients: Recipient[];
</script>

<!-- We want to show some visualization!-->
<Visualization
	label={'Testing'}
	dataSet={[...Array(10)].map((_, __) => ({
		x: '0xd...454',
		y: 129
	}))}
></Visualization>
{#each recipients as recipient}
	<div class="flex-col space-x-3 space-y-3">
		<Card.Root>
			<Card.Content>
				<p>receiver:{recipient.receiver}</p>
				<p>amount:{recipient.amount}</p>
				<p>last date: {recipient.date}</p>
			</Card.Content>
		</Card.Root>
		<Accordion>
			<AccordionItem>
				<svelte.fragment slot="summary">View transactions</svelte.fragment>
				<svelte.fragment slot="content"
					><Paginatedtable
						head={['date', 'amount', 'sender', 'token']}
						source={recipient.transactions}
						showFirstLastButtons={false}
					></Paginatedtable>
				</svelte.fragment>
			</AccordionItem>
		</Accordion>
	</div>
{/each}
