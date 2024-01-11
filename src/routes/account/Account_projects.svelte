<!-- projects that the account is a part of as either it's creator or member or account manager -->

<script lang="ts">
	// name
	// chain(s): how to get
	// role
	// project creation date
	// project id to move to that project

	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card';
	import { getChainMapping } from '$lib/datawrangler';
	import { profileInfo } from '$lib/stores';

	import { CircleIcon } from 'lucide-svelte';
	export let projects: {
		name: string;
		profileId: string;
		chainId: string;
	}[];
	function moveToPage(project: any) {
		profileInfo.set(project);
		goto(`/profile/${project.profileId}`);
	}
</script>

{#each projects as project}
	<button on:click={() => moveToPage(project)}>
		<Card.Root>
			<Card.Content>
				<p>project name: {project.name}</p>
				<p>account roles</p>
				<button class="chip variant-soft hover:variant-filled flex flex-row">
					<CircleIcon />
					<span>{getChainMapping(project.chainId)}</span>
				</button>
			</Card.Content>
		</Card.Root>
	</button>
{/each}
