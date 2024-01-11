<script lang="ts">
	import { peopleProfile } from '$lib/stores';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	let profile = $peopleProfile;
</script>

{#if profile == null}
	<ProgressRadial
		stroke={100}
		meter="stroke-primary-500"
		track="stroke-primary-500/30"
		value={undefined}
	/>
{:else}
	<div class="flex flex-col space-x-2 space-y-2">
		<a href="/account/{profile.creator}">
			<div class="flex flex-row border border-sky-500">
				<strong>Creator</strong>
				<p>{profile.creator}</p>
			</div>
		</a>
		<a href="/account/{profile.owner}">
			<div class="flex flex-row border border-sky-500">
				<strong>Owner</strong>
				<p>{profile.owner}</p>
			</div>
		</a>
		<div class="flex flex-col border border-sky-500">
			<strong>Members</strong>
			{#each profile.members as member}
				<a href="/account/{member}">
					<p>{member}</p>
				</a>
			{/each}
		</div>
		<hr />
	</div>
{/if}
