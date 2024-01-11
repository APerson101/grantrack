<script lang="ts">
	import type { PoolTransaction } from '$lib/utils';
	import Paginatedtable from './components/Paginatedtable.svelte';
	let source: PoolTransaction[] = [...Array(20)].map((_, __) => ({
		sender: '342342342',
		receiver: '3589453',
		amount: '40',
		token: 'ARB',
		date: '2/2/24',
		type: 'debit'
	}));
	let head = ['sender', 'receiver', 'amount', 'token', 'date'];
</script>

<Paginatedtable {head} {source} showFirstLastButtons={true}></Paginatedtable>
