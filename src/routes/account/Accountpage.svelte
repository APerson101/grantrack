<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { getChainMapping, recursiveAccountRetreival } from '$lib/datawrangler';
	import { APIURL } from '$lib/helper';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { cacheExchange, createClient, fetchExchange, setContextClient } from '@urql/svelte';
	import AccountProjects from './Account_projects.svelte';
	export let data: { accountId: string };
	let selection: number = 0;

	export const client = createClient({
		url: APIURL,
		exchanges: [cacheExchange, fetchExchange]
	});

	setContextClient(client);
	async function loadAcc() {
		// const client = getContextClient();
		// const accountql = await client
		// 	.query(accountQuery, {
		// 		accountId: data.accountId
		// 	})
		// 	.toPromise();
		// return [];
		return await recursiveAccountRetreival(client, data.accountId);
	}
	$: accs = loadAcc();
</script>

<!--
  we want the account to have: address, pools where is manager, pools where is creator/owner. funding received. Profiles created
  !-->

{#await accs}
	<p>loading</p>
{:then loaded}
	{#if loaded != null}
		<div class="flex flex-col space-x-3 space-y-3">
			<Card.Root>
				<Card.Content>
					<p>address: {loaded[0].address}</p>
				</Card.Content>
				<Card.Content class="flex flex-row">
					<p>active chains:</p>
					{#each loaded[0].chains as chain}
						<p>{getChainMapping(chain)}</p>
					{/each}
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Content>
					<!-- show account break downs -->
					<div class="flex-col space-y-2">
						<TabGroup>
							<Tab bind:group={selection} name="justify" value={0}>Profile Activities</Tab>
							<Tab bind:group={selection} name="justify" value={1}>Account(pool) Manager/Admin</Tab>
							<svelte:fragment slot="panel">
								{#if selection == 0}
									<AccountProjects projects={loaded[0].profileAssociations}></AccountProjects>
								{:else if selection == 1}
									<div class="flex-col space-x-2 space-y-2">
										<p>Manager pools</p>
										{#each loaded[0].managerPools as mp}
											<Card.Root>
												<Card.Content>
													<p>pool id:{mp}</p>
												</Card.Content>
											</Card.Root>
										{/each}
										<p>Admin pools</p>
										{#each loaded[0].adminPools as ap}
											<Card.Root>
												<Card.Content>
													<p>pool id:{ap}</p>
												</Card.Content>
											</Card.Root>
										{/each}
									</div>
								{/if}
							</svelte:fragment>
						</TabGroup>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	{:else}
		<div>loaded value is null</div>
	{/if}
{/await}
