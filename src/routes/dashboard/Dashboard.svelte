<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import {
		CHAINSCONSTANT,
		fetchEndedGrants,
		fetchProfileFromAllChains,
		fetchUpComingGrants,
		fetchactiveGrants,
		filterResults,
		getChainColor,
		getChainMapping
	} from '$lib/datawrangler';
	import { getProfilesPaginated } from '$lib/helper';
	import { loadedProfiles } from '$lib/stores';
	import type { IProfile, ProfileType } from '$lib/utils';
	import { getContextClient } from '@urql/svelte';
	import Profilesummary from './components/Profilesummary.svelte';

	// let profilesQuery: OperationResultStore;
	const first = 40;
	const offset = 0;
	const client = getContextClient();
	let statusSelection: string = 'null';
	let chainSelection: string = 'null';
	let currentDisplay: string = '0';
	// $: profilesQuery = queryStore({
	// 	client: getContextClient(),
	// 	query: getProfilesPaginated,
	// 	variables: {
	// 		first,
	// 		offset
	// 	}
	// });
	console.log(currentDisplay);
	async function retreiver(filter?: boolean) {
		// return fakeData;
		// await new Promise((rs) => setTimeout(rs, 0));
		// if (filter == true) {
		// 	return filterRes(fakeData);
		// }
		var newProfilesJson = await client
			.query(getProfilesPaginated, {
				first,
				offset
			})
			.toPromise();
		//format and save
		const profilesJson = newProfilesJson.data.profiles as IProfile[];
		console.log('I HOPE THIS WORKS');
		const allProfiles: ProfileType[] = [];
		for (let index = 0; index < profilesJson.length; index++) {
			const element = profilesJson[index];
			console.log(`${element.profileId}`);
			console.log('preparing to fetch data....');
			const profile = await fetchProfileFromAllChains(client, element.profileId);
			console.log(profile);
			if (profile != null) allProfiles.push(profile);
		}
		loadedProfiles.set([...allProfiles]);
		return [...allProfiles];
	}
	$: profilesPromise = retreiver();

	function saveAll(profiles: ProfileType[]) {
		loadedProfiles.set(profiles);
	}

	async function getMicro() {
		currentDisplay = '5';
		if (statusSelection == 'u') {
			return await fetchUpComingGrants(client);
		}

		if (statusSelection == '0') {
			return await fetchactiveGrants(client);
		}

		if (statusSelection == 'e') {
			return await fetchEndedGrants(client);
		}
		return [];
	}

	function filterRes(profiles: ProfileType[]) {
		currentDisplay = '0';
		return filterResults(chainSelection, profiles);
	}

	$: grants = getMicro();
</script>

{#await profilesPromise}
	<p>loading...</p>
{:then profiles}
	<div class="ml-5 flex flex-row">
		<div class="search_filter ml-10 mt-4 flex w-80 flex-col space-y-4">
			<strong class="text-lg"> Status </strong>
			{#if statusSelection != 'null'}
				<Button on:click={() => getMicro()}>Filter</Button>
			{/if}
			<RadioGroup.Root bind:value={statusSelection}>
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value="u" id="u" />
					<Label for="u" class="text-base font-semibold">Upcoming</Label>
				</div>
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value="o" id="o" />
					<Label for="o" class="text-base font-semibold">Open</Label>
				</div>
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value="e" id="e" />
					<Label for="e" class="text-base font-semibold">Ended</Label>
				</div>
			</RadioGroup.Root>
			<div class="pb-5 pt-5"></div>
			<strong class="text-lg"> Chains </strong>
			{#if chainSelection != 'null'}
				<Button on:click={() => retreiver(true)}>Filter</Button>
			{/if}
			<RadioGroup.Root bind:value={chainSelection} class="space-y-1">
				{#each CHAINSCONSTANT as chain}
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value={chain} id={chain} />
						<Label for={chain} class="text-base font-semibold">
							<Card.Root class="pl-2 pr-2 {getChainColor(chain)}">
								{getChainMapping(chain)}
							</Card.Root>
						</Label>
					</div>
				{/each}
			</RadioGroup.Root>
		</div>
		<!-- {#if currentDisplay != '0'} -->
		<!-- {profiles.length} -->
		<div class="flex w-full flex-col space-y-4">
			{#each profiles as profile}
				<Profilesummary on:click={() => saveAll(profiles)} {profile} />
			{/each}
		</div>
		<!-- {:else if currentDisplay == '5'}
			<div class="m-2 flex-col space-y-2 p-4">
				{#await grants}
					<div>loading Grants</div>
				{:then allGrants}
					{#each allGrants as gg}
						<div class="rounded-md bg-[#1B3A4B]">
							{gg.maxRequestedAmount}
							{gg.allocationEndTime}
							{gg.allocationStartTime}
							{gg.approvalThreshold}
							{#each gg.microGrantRecipients as recepient}
								{recepient.chainId}
								{recepient.recipientAddress}
								{recepient.requestedAmount}
								{recepient.sender}
								{recepient.status}
							{/each}
						</div>
					{/each}
				{/await}
			</div>
		{/if} -->
	</div>
{/await}
