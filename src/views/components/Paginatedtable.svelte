<script lang="ts">
	import type { PaginationSettings, TableSource } from '@skeletonlabs/skeleton';
	import { Paginator, Table, tableMapperValues } from '@skeletonlabs/skeleton';
	export let source: any[];
	export let head: string[];
	export let showFirstLastButtons: boolean;
	const table: TableSource = {
		head: head,
		body: tableMapperValues(source, head)
	};

	let paginationSettings = {
		page: 0,
		limit: 5,
		size: source.length,
		amounts: [1, 2, 5, 10]
	} satisfies PaginationSettings;
</script>

<Table source={table} />
<Paginator>
	bind:settings={paginationSettings}
	{showFirstLastButtons}
	showPreviousNextButtons="{true}"
</Paginator>
