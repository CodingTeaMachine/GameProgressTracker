<script lang="ts">
	import PingLoader from '$lib/components/ui/PingLoader.svelte';
	import { writable } from 'svelte/store';
	import type { ExplorePageGame } from '$lib/types/domain/game.ts';
	import { DEFAULT_ITEMS_PER_PAGE } from '$lib/data/constants';
	import { onMount } from 'svelte';
	import FilterPanel from '$lib/components/explore/FilterPanel.svelte';
	import GameCard from '$lib/components/explore/GameCard.svelte';

	import { openErrorToast } from '$lib/helpers/toasts';
	import { getToastStore } from '@skeletonlabs/skeleton';

	import Paginator from '$/lib/components/input/Paginator.svelte';
	import GameService from '$/lib/client/services/Game.service';

	let games = writable<ExplorePageGame[]>([]);
	let totalAmountOfGames = 0;
	let loadingGames = false;

	let currentPage = 0;
	let currentPerPage = DEFAULT_ITEMS_PER_PAGE;
	let titleSearch = '';

	const toastStore = getToastStore();

	$: [currentPage, currentPerPage, titleSearch], getGames();

	onMount(() => {
		getGames();
	});

	function getGames() {
		loadingGames = true;
		GameService.getPaginatedGames({ page: currentPage + 1, perPage: currentPerPage }, { title: titleSearch })
			.then(load => {
				games.set(load.games);
				totalAmountOfGames = load.totalAmount;
			})
			.catch(errorMessage => {
				openErrorToast(toastStore, errorMessage, 10000);
				games.set([]);
			})
			.finally(() => (loadingGames = false));
	}
</script>

<div class="mx-auto my-20 flex w-3/4 flex-col gap-5">
	<FilterPanel on:searchTextChange={newSearchText => (titleSearch = newSearchText.detail)} />

	{#if loadingGames}
		<div class="flex h-96 w-full items-center justify-center">
			<PingLoader />
		</div>
	{:else if $games.length > 0}
		<div class="grid grid-cols-6 justify-items-center gap-5">
			{#each $games as game}
				<GameCard {game} />
			{/each}
		</div>
	{:else}
		<div class="flex h-96 w-full items-center justify-center">
			<span class="rounded-btn bg-surface-900/50 p-5 text-lg"> No more games to load... </span>
		</div>
	{/if}

	<Paginator bind:perPage={currentPerPage} bind:page={currentPage} totalItemCount={totalAmountOfGames} />
</div>
