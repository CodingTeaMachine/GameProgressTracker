<script lang="ts">
	import BaseCard from '$lib/components/explore/BaseCard.svelte';
	import type { ExplorePageGame } from '$types/domain/game';

	//The image is downloaded over an API call, the game's cover image should be ignored at this point.
	export let image: string;
	export let game: ExplorePageGame;
</script>

<BaseCard>
	<div class="group relative cursor-pointer">
		<img src={image} alt="game_cover_image" class="rounded-md" />

		<div
			class="absolute inset-0 flex items-center justify-center rounded-md bg-surface-900/90 opacity-0 transition-opacity duration-100 group-hover:opacity-100"
		>
			<p class="text-lg">{game.title}</p>
		</div>
	</div>
</BaseCard>
