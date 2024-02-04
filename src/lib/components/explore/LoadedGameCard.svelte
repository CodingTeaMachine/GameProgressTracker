<script lang="ts">
	import BaseCard from '$lib/components/explore/BaseCard.svelte';
	import ImageNotFoundCard from '$lib/components/explore/ImageNotFoundCard.svelte';
	import LoadedGameCardHover from '$lib/components/explore/LoadedGameCardHover.svelte';
	import type { ExplorePageGame } from '$types/domain/game';

	//The image is downloaded over an API call, the game's cover image should be ignored at this point.
	export let image: string | null;
	export let game: ExplorePageGame;
</script>

<BaseCard>
	<div class="group relative cursor-pointer">
		{#if image !== null}
			<!--svelte-ignore a11y-missing-attribute-->
			<img src={image} class="rounded-md w-full h-full" />
		{:else}
			<ImageNotFoundCard/>
		{/if}
		<LoadedGameCardHover {game}/>
	</div>
</BaseCard>
