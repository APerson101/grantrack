<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { getChainColor, getChainMapping } from '$lib/datawrangler';
	import { profileInfo } from '$lib/stores';
	import type { ProfileType } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import { LucideCalendar } from 'lucide-svelte';
	export let profile: ProfileType;

	function profileClicked() {
		profileInfo.set(profile);
		goto(`/profile/${profile.id}`);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={profileClicked} class="m-3 mr-3 flex rounded-lg bg-[#1B3A4B] p-3 sm:flex">
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

		<label for="message" class="mb-1 mt-2 block text-sm font-medium text-white dark:text-white"
			>managers</label
		>
		<div class="flex flex-row space-x-3">
			{#each profile.accountManagers as manager}
				<Card.Root class="bg-transparent text-white">
					<p class="pl-3 pr-3">
						{manager.substring(0, 3) +
							'...' +
							manager.substring(manager.length - 4, manager.length - 1)}
					</p></Card.Root
				>
			{/each}
		</div>
		<label for="message" class="mb-1 mt-2 block text-sm font-medium text-white dark:text-white"
			>chains</label
		>
		<div class="flex flex-row space-x-2">
			{#each profile.chains as chain}
				<Card.Root class={getChainColor(chain)}>
					<p class="pl-3 pr-3 text-white">{getChainMapping(chain)}</p>
				</Card.Root>
			{/each}
		</div>
	</div>
</div>
