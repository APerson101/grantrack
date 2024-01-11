<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { getChainColor, getChainMapping } from '$lib/datawrangler';
	import { peopleProfile, profileInfo } from '$lib/stores';
	import type { ProfileType, Recipient } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { LucideCalendar } from 'lucide-svelte';
	import Projectpeople from '../../views/Projectpeople.svelte';
	import Fundedprojects from '../dashboard/components/Fundedprofiles.svelte';
	import Grandfundings from '../dashboard/components/Grandfundings.svelte';
	let tabSet: number = 0;
	console.log('saved profile is ', $profileInfo);
	let profile = $profileInfo as ProfileType;
	peopleProfile.set({
		owner: $profileInfo!.address,
		creator: $profileInfo!.creator,
		members: [...$profileInfo!.members.map((e) => e.accountId)]
	});

	let allRecepientsProjects: Map<string, Recipient[]> = new Map<string, Recipient[]>();
	const allPools: Recipient[] = [];
	const allRecipientsID: string[] = [];
	for (let index = 0; index < $profileInfo!.amount.pools.length; index++) {
		const pool = $profileInfo!.amount.pools[index];
		console.log(pool);
		allPools.push(...pool.recepients);
		allRecipientsID.push(...pool.recepients.map((e) => e.receiver));
	}
	let uniqueRecipients: string[] = [...new Set(allRecipientsID)];
	console.log(uniqueRecipients);
	//get categorisezd receipeint info
	for (let index = 0; index < uniqueRecipients.length; index++) {
		const element = uniqueRecipients[index];
		const ss = allPools.filter((e) => e.receiver == element);
		allRecepientsProjects.set(element, ss);
	}
	console.log(allRecepientsProjects);
</script>

<div class="m-3 mr-3 flex rounded-lg bg-[#1B3A4B] p-3 sm:flex">
	<div class="h-40 flex-col space-x-1 space-y-3 pt-2 sm:w-full md:w-8/12">
		<p class="text-bold text-2xl font-bold">{profile.name}</p>
		<!-- card status -->
		<div class="w-fit rounded-lg bg-[#2c6e49] p-1 pl-2 pr-2">12 days left</div>
		<!-- amount -->
		<div class="flex flex-row space-x-2">
			<p class="text-lg font-extrabold">$ {profile.amount.totalAmount}</p>
		</div>
		<div class="flex flex-row space-x-2">
			<div class="flex flex-row space-x-2">
				<p>{profile.acceptedProfiles} participants</p>
			</div>
		</div>
	</div>

	<div class="mt-2 space-y-2 pl-5 pr-5">
		<Button variant="outline" class="flex-row  space-x-3  rounded-lg bg-transparent">
			<Icon icon="icon-park-twotone:user-business" />
			<p>
				{profile.creator}
			</p></Button
		>

		<div class="flex flex-row space-x-2 rounded-full">
			<LucideCalendar />
			<p>{profile.creationDate}</p>
		</div>

		<div class="flex flex-row space-x-2">
			{#each profile.chains as chain}
				<Card.Root class={getChainColor(chain)}>
					<p class="pl-3 pr-3 text-white">{getChainMapping(chain)}</p>
				</Card.Root>
			{/each}
		</div>
	</div>
</div>

<Card.Root class="bg-transparent text-white">
	<Card.Content>
		<TabGroup>
			<Tab bind:group={tabSet} name="Projects" value={0}>Projects</Tab>
			<Tab bind:group={tabSet} name="Funding" value={1}>Funding</Tab>
			<Tab bind:group={tabSet} name="People" value={2}>People</Tab>

			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<Fundedprojects unique={allRecepientsProjects}></Fundedprojects>
				{:else if tabSet === 1}
					<Grandfundings />
				{:else if tabSet === 2}
					<Projectpeople />
				{/if}
			</svelte:fragment>
		</TabGroup>
	</Card.Content>
</Card.Root>
