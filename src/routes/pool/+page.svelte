<script lang="ts">
	import Poolanalysis from '../../views/Poolanalysis.svelte';

	import { recipients } from '$lib/stores';
	$: receipients = recipients;

	//  = [...Array(3)].map((_, __) => ({
	// 	date: '22/12/22',
	// 	receiver: 'ox3495349',
	// 	amount: '12',
	// 	sender: '0xdsfa89',
	// 	transactions: [...Array(10)].map((_, __) => ({
	// 		date: '22/12/22',
	// 		amount: '120',
	// 		sender: '0xdsfa89',
	// 		token: 'ARB',
	// 		receiver: 'ox3495349',
	// 		type: 'D/C'
	// 	}))
	// }));
</script>

<Poolanalysis recipients={$receipients}></Poolanalysis>
