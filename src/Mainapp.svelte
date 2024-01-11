<script lang="ts">
	import { createClient } from '@urql/core';
	import { cacheExchange, fetchExchange, setContextClient } from '@urql/svelte';
	// import { onMount } from 'svelte';
	import Dashboard from './routes/dashboard/Dashboard.svelte';
	const APIURL = 'https://alloscan.spec.dev/graphql';

	export const client = createClient({
		url: APIURL,
		exchanges: [cacheExchange, fetchExchange]
	});

	setContextClient(client);
</script>

<Dashboard />
