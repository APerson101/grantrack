<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type { SideNavItem } from '$lib/utils';
	import Icon from '@iconify/svelte';
	export let width: number;
	export let colour: string;
	export let clickHandler: (menu: SideNavItem) => void;
	export let mousehover: (menu: SideNavItem) => void;
	export let mouseout: (menu: SideNavItem) => void;
	export let menu: SideNavItem;
	export let fontWeight: string;
</script>

<Tooltip.Root>
	<Tooltip.Trigger class="tip w-full ">
		<button
			class="menu flex w-full flex-row {colour} justify-start space-x-4 rounded-md p-2"
			on:click={() => clickHandler(menu)}
			on:mouseover={() => mousehover(menu)}
			on:focus={() => mousehover(menu)}
			on:mouseout={() => mouseout(menu)}
			on:blur={() => mouseout(menu)}
		>
			<Icon icon={menu.icon} style="font-size: 24px" />
			{#if width >= 768}
				<div class="hidden text-white sm:block {fontWeight}">{menu.title}</div>
			{/if}
		</button>
	</Tooltip.Trigger>

	<Tooltip.Content>
		{'view ' + menu.title}
	</Tooltip.Content>
</Tooltip.Root>
