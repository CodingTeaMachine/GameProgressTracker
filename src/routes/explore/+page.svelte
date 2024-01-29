<script lang="ts">
	import FilterPanel from '$lib/components/explore/FilterPanel.svelte';
	import GameCard from '$lib/components/explore/GameCard.svelte';
	import type { ExplorePageGame } from '$types/domain/game';
	
	const game: ExplorePageGame = {
		id: 0,
		cover: "Far_Cry_6.webp",
		title: "Far Cry 6",
		platforms: [
			"ps5", "ps4", "xbox"
		]
	};
	
</script>

<div class="my-20 mx-auto w-3/4">
	<FilterPanel/>
	
	<div class="grid grid-cols-6 justify-items-center gap-5">
		{#each {length: 102} as _, i}
			<GameCard {game}/>
		{/each}
	</div>
</div>
