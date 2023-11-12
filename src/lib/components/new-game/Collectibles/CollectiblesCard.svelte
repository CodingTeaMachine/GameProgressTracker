<script lang="ts">
	import type { Collectible, CollectibleWithAreaId } from '$/lib/types/types';
	import SimpleRow from '$lib/components/new-game/Collectibles/SimpleRow.svelte';
	import Card from '../Card.svelte';
	import AddCollectibleRow from './AddCollectibleRow.svelte';
	import CollectibleRow from './CollectibleRow.svelte';
	import { NewGameStore } from '$/lib/stores/new-game/newGameStore';

	const collectibleTypesStore = NewGameStore.collectibleTypes;
	const areas = NewGameStore.areas;

	let collectiblesPerArea: CollectibleWithAreaId[] = [];

	function addCollectableToArea(areaId: number, collectibleEvent: CustomEvent<Collectible>) {
		const collectible = collectibleEvent.detail;

		collectiblesPerArea.push({ ...collectible, areaId });
		collectiblesPerArea = collectiblesPerArea;
	}

	function deleteCollectable(localId: CustomEvent<number>) {
		collectiblesPerArea = collectiblesPerArea.filter(collectible => collectible.localId !== localId.detail);
	}
</script>

<Card title="Collectibles" double>
	<div class="flex h-5/6 flex-col gap-2 overflow-scroll">
		<AddCollectibleRow
			collectibleTypes={$collectibleTypesStore}
			on:save={newCollectible => addCollectableToArea(-1, newCollectible)}
		/>

		{#each collectiblesPerArea.filter(collectible => collectible.areaId === -1) as collectible (collectible.localId)}
			<CollectibleRow bind:collectible on:delete={deleteCollectable} />
		{/each}

		{#each $areas as area (area.id)}
			{#if area.title}
				<SimpleRow bind:data={area} />
				<div class="ml-auto w-11/12">
					<AddCollectibleRow
						collectibleTypes={$collectibleTypesStore}
						on:save={newCollectible => addCollectableToArea(area.id, newCollectible)}
					/>

					{#each collectiblesPerArea.filter(collectible => collectible.areaId === area.id) as collectible (collectible.localId)}
						<CollectibleRow bind:collectible on:delete={deleteCollectable} />
					{/each}

					{#if area.children}
						{#each area.children as childArea}
							{#if childArea.title}
								<div class="ml-auto w-11/12">
									<SimpleRow bind:data={childArea} />
									<div class="ml-auto w-11/12">
										<AddCollectibleRow
											collectibleTypes={$collectibleTypesStore}
											on:save={newCollectible => addCollectableToArea(childArea.id, newCollectible)}
										/>
										{#each collectiblesPerArea.filter(collectible => collectible.areaId === childArea.id) as collectible (collectible.localId)}
											<CollectibleRow bind:collectible on:delete={deleteCollectable} />
										{/each}
									</div>
								</div>
							{/if}
						{/each}
					{/if}
				</div>
			{/if}
		{/each}
	</div>
</Card>
