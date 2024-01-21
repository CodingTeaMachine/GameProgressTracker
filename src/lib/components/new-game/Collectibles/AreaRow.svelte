<script lang="ts">
	import { Map } from 'lucide-svelte';
	import type { Area } from '$/lib/types/domain/area';

	export let area: Area;
</script>

<div
	class="flex cursor-pointer items-center justify-between gap-4 rounded-md bg-surface-500/25 px-3 duration-75 hover:bg-surface-700"
>
	<div class="flex h-14 w-full items-center gap-4">
		<div class="flex w-16 items-center justify-center">
			{#if area.imageSrc}
				<!--svelte-ignore a11y-img-redundant-alt-->
				<img src={area.imageSrc} alt="cover image" class="h-full rounded-md" />
			{:else}
				<Map />
			{/if}
		</div>

		<div class="flex h-full w-full flex-col justify-evenly">
			<div class="text-lg font-bold">{area.title}</div>
			{#if area.description}
				<div class="opacity-50">{area.description}</div>
			{/if}
		</div>
	</div>
</div>
