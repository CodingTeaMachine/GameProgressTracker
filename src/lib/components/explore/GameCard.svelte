<script lang="ts">
	import GameService from '$lib/client/services/Game.service';
	import LoadedGameCard from '$lib/components/explore/LoadedGameCard.svelte';
	import ImageNotFoundCard from '$lib/components/explore/ImageNotFoundCard.svelte';
	import LoadingImageCard from '$lib/components/explore/LoadingImageCard.svelte';
	import type { ExplorePageGame } from '$types/domain/game';

	export let game : ExplorePageGame;
</script>

<div class="w-full">
	
	{#if game.cover !== null}
		{#await GameService.getCoverImage(game.cover)}
			<LoadingImageCard/>
		{:then image}
			<LoadedGameCard {game} {image}/>
		{:catch _}
			<ImageNotFoundCard/>
		{/await}
	{:else}
		<LoadedGameCard {game} image={null}/>
	{/if}
	

	
</div>
