<script lang="ts">
	import Accountpage from '../Accountpage.svelte';
	export let data: { accountId: string };
</script>

<Accountpage {data}></Accountpage>
