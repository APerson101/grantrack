<script lang="ts">
	import Searchbar from '$lib/components/Searchbar.svelte';
	import Navigation from '$lib/components/ui/navigation/Navigation.svelte';
	import { Toaster } from '$lib/components/ui/sonner';

	import {
		AppBar,
		AppShell,
		Drawer,
		getDrawerStore,
		initializeStores
	} from '@skeletonlabs/skeleton';
	import '../app.pcss';

	initializeStores();
	const drawerStore = getDrawerStore();

	function drawerOpen(): void {
		drawerStore.open({});
	}

	let innerHeight: any;
</script>

<svelte:window bind:innerHeight />
<Drawer>
	<h2 class="p-4">Menu</h2>
	<hr />
	<Navigation /></Drawer
>
<AppShell
	slotSidebarLeft=" w-0 lg:w-64  bg-[#1B3A4B] rounded-lg ml-4"
	slotPageContent="w-full mr-3"
>
	<svelte:fragment slot="header">
		<AppBar>
			<!-- <svelte:fragment slot="lead">
				<div class="flex items-center">
					<button on:click={drawerOpen} class="btn btn-sm mr-4 lg:hidden">
						<span>
							<svg viewBox="0 0 100 80" class="fill-token h-4 w-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
				</div>
			</svelte:fragment> -->
			<Searchbar />
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation></Navigation>
	</svelte:fragment>
	<Toaster />
	<slot />
</AppShell>

<style>
	/* :global(body) {
		background-color: #f2eee2;
		color: #0084f6;
		transition: background-color 0.3s
	} */
	:global(body) {
		background-color: #1d3040;
		color: #bfc2c7;
	}
</style>
