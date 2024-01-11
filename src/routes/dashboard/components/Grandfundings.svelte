<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { recipients } from '$lib/stores';
	import type { ProfileFundings, Recipient } from '$lib/utils';

	function moveToPage(data: Recipient[]) {
		recipients.set(data);
		goto('/pool');
	}
	// get transaction for each recepient;

	async function getTxns() {
		// var newProfilesJson = await client
		// 	.query(getProfilesPaginated, {
		// 		first,
		// 		offset
		// 	})
		// 	.toPromise();
	}
	let sampleFundings: ProfileFundings = {
		totalAmount: '5000',
		pools: [...Array(4)].map((_, __) => ({
			id: '4',
			chain: '4',
			amount: '600',
			token: 'BTS',
			strategyName: 'Simple Sample Contract',
			strategyContract: 'ox893453489',
			feePaid: '40',
			manager: ['0x78345jk78934'],
			recepients: [...Array(3)].map((_, __) => ({
				date: '22/12/22',
				receiver: 'ox3495349',
				amount: '12',
				sender: '0xdsfa89',
				transactions: [...Array(10)].map((_, __) => ({
					date: '22/12/22',
					receiver: 'ox3495349',
					amount: '12',
					sender: '0xdsfa89',
					token: 'ARB',
					type: 'C/D'
				}))
			}))
		}))
	};
</script>

<div class="mb-2 space-y-2">
	<p>Total amount is: {sampleFundings.totalAmount}</p>
	{#each sampleFundings.pools as pool}
		<Card.Root class="bg-transparent text-white">
			<Card.Content>
				<p>amount: {pool.amount}</p>
				<p>token:{pool.token}</p>
				<p>Strategy name:{pool.strategyName}</p>
				<p>disbribution strategy:{pool.strategyContract}</p>
				<p>manager:{pool.manager}</p>
				<Button class="text-black" variant="outline" on:click={() => moveToPage(pool.recepients)}
					>recepients</Button
				>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
