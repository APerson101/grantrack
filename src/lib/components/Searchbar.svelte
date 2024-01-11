<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { fetchProfileFromAllChains, recursiveAccountRetreival } from '$lib/datawrangler';
	import { profileInfo } from '$lib/stores';
	import { getContextClient } from '@urql/svelte';
	import { toast } from 'svelte-sonner';

	let textToSearch: string;

	async function isSearching() {
		const client = getContextClient();
		toast(`searching for ${textToSearch}`);
		// find the related thing and take the user to the page

		const profile = await fetchProfileFromAllChains(client, textToSearch);
		if (profile == null) {
			// search for account

			const account = await recursiveAccountRetreival(client, textToSearch);

			if (account == null) {
				toast(`${textToSearch} is neither a profile or an account, failed to find any results`);
			} else {
				toast('Account found....');
				goto(`/account/${textToSearch}`);
			}
		} else {
			toast(`Profile found...`);
		}
		profileInfo.set(profile);
		goto(`/profile/${profile!.id}`);
	}
</script>

<form class="flex w-full space-x-2">
	<p>GrantTrack</p>
	<Input
		bind:value={textToSearch}
		type="search"
		placeholder="search profiles/address/pools"
		class="text-white"
	/>
	<Button on:click={() => isSearching()} type="submit">Search</Button>
</form>
