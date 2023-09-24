<script>
	import { AppBar } from '@skeletonlabs/skeleton';
	import { pageTitle, pageIcon } from '$lib/stores/page';
</script>

<AppBar background='bg-none'>
	<div class='capitalize flex gap-1 items-center'>
		<svelte:component this={$pageIcon}/>
		<span class='text-2xl font-bold'>
			{$pageTitle}
		</span>
	</div>
</AppBar>
