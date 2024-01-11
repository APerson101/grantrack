<script lang="ts">
	import { fetchProfileFromAllChains } from '$lib/datawrangler';
	import type { ProfileType, Recipient } from '$lib/utils';
	import { getContextClient } from '@urql/svelte';
	import Profilesummary from './Profilesummary.svelte';
	export let unique: Map<string, Recipient[]>;
	async function fetchprofiles(): Promise<ProfileType[]> {
		const keys = [...unique.keys()];
		const listProfiles: ProfileType[] = [];
		for (let index = 0; index < keys.length; index++) {
			const id = keys[index];
			//fetch more info about this id:
			const client = getContextClient();
			const profile = await fetchProfileFromAllChains(client, id);
			listProfiles.push(profile!);
		}
		return listProfiles;
	}
	$: fp = fetchprofiles();
</script>

{#await fp}
	<div>loading...</div>
{:then unique}
	<div class="flex-col space-y-3">
		{#each unique as profile}
			<Profilesummary {profile}></Profilesummary>
		{/each}
	</div>
{/await}
