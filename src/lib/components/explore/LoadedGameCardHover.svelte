<script lang="ts">
	import PlatformTag from '$lib/components/explore/PlatformTag.svelte';
	import type { ExplorePageGame } from '$types/domain/game';
	import type { ExplorePagePlatform } from '$types/domain/platform';

	export let game: ExplorePageGame;

	const morePlatforms: ExplorePagePlatform = { name: '...', shorthand: '...' };
</script>

<div
	class="absolute inset-0 flex flex-col justify-between rounded-md
			bg-surface-900/90 p-2 opacity-0
			transition-opacity duration-100 group-hover:opacity-100"
>
	<p class="w-full text-center text-lg">{game.title}</p>
	<div class="flex flex-wrap gap-2">
		{#each game.Platforms.slice(0, 3) as platform}
			<PlatformTag {platform} />
		{/each}

		{#if game.Platforms.length > 3}
			<PlatformTag platform={morePlatforms} />
		{/if}
	</div>
</div>
