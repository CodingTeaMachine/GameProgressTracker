<script>
	import BaseCard from '$lib/components/explore/BaseCard.svelte';
	import PingLoader from '$lib/components/ui/PingLoader.svelte';
</script>

<BaseCard>
	<div class="flex flex-row gap-3 w-full h-full items-center justify-center">
		<PingLoader/>
	</div>
</BaseCard>
