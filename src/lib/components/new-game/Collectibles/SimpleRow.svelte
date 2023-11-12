<script lang="ts">
	import { Map } from 'lucide-svelte';
	import type { Area, CollectibleType } from '$/lib/types/types';

	export let data: Area | CollectibleType;
</script>

<div
	class="flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 duration-75 hover:bg-surface-700"
>
	<div class="flex h-10 w-full items-center gap-4">
		<div class="flex h-full w-16 items-center justify-center">
			{#if data.imageSrc}
				<img src={data.imageSrc} alt="cover image" class="h-full rounded-md" />
			{:else}
				<Map />
			{/if}
		</div>

		<div class="flex h-full w-full flex-col justify-evenly">
			<div class="text-lg font-bold">{data.title}</div>
			<div class="opacity-50">{data.description}</div>
		</div>
	</div>
</div>
