<script lang="ts">
	import GameService from '$lib/client/services/Game.service';
	import CoverImageCard from '$lib/components/explore/CoverImageCard.svelte';
	import ImageNotFoundCard from '$lib/components/explore/ImageNotFoundCard.svelte';
	import LoadingImageCard from '$lib/components/explore/LoadingImageCard.svelte';
	import type { ExplorePageGame } from '$types/domain/game';

	export let game : ExplorePageGame;
</script>

<div class="w-full">
	
	{#await GameService.getCoverImage(game.cover)}
		<LoadingImageCard/>
	{:then image}
		<CoverImageCard {game} {image}/>
	{:catch _}
		<ImageNotFoundCard/>
	{/await}
	
</div>
