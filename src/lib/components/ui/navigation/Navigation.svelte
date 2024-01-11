<script lang="ts">
	import { currentPage } from '$lib/stores';
	import type { SideNavItem } from '$lib/utils';
	import NavItem from './NavItem.svelte';
	let outerWidth = 0;
	const dashboard: SideNavItem = {
		title: 'Dashboard',
		path: '/',
		icon: 'radix-icons:dashboard',
		index: 0
	};
	const discord: SideNavItem = {
		index: 2,
		title: 'Discord',
		path: '/discord',
		icon: 'la:discord'
	};
	const telegram: SideNavItem = {
		index: 3,
		title: 'Telegram',
		path: '/telegram',
		icon: 'la:telegram'
	};

	const chat: SideNavItem = {
		title: 'Chat',
		path: '/chat',
		icon: 'bi:chat',
		index: 1
	};
	let items: SideNavItem[] = [dashboard, chat, discord, telegram];
	let hoverItem: SideNavItem | null;

	function clickHandler(menu: SideNavItem): void {
		currentPage.set(menu.index);
	}

	function mousehover(menuItem: SideNavItem) {
		hoverItem = menuItem;
	}
	function mouseout(menu: SideNavItem) {
		hoverItem = null;
	}
</script>

<svelte:window bind:outerWidth />
<nav class="list-nav space-y-3 p-4">
	{#each items as menu}
		<NavItem
			{clickHandler}
			{mousehover}
			{mouseout}
			{menu}
			width={outerWidth}
			fontWeight={$currentPage == menu.index ? 'font-bold' : 'font-semibold'}
			colour={$currentPage === menu.index
				? 'bg-[#006466]'
				: hoverItem == menu
					? 'bg-[#212F45]'
					: 'bg-transparent'}
		/>
	{/each}
</nav>
