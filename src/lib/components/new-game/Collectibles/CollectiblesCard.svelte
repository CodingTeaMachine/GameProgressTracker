<script lang="ts">
	import type { Collectible } from '$/lib/types/domain/collectible';
	import AreaRow from '$lib/components/new-game/Collectibles/AreaRow.svelte';
	import { CornerDownRight } from 'lucide-svelte';
	import Card from '../Card.svelte';
	import AddCollectibleRow from './AddCollectibleRow.svelte';
	import CollectibleRow from './CollectibleRow.svelte';
	import { NewGameStore } from '$/lib/stores/new-game/newGameStore';

	const collectibleTypesStore = NewGameStore.collectibleTypes;
	const areas = NewGameStore.areas;

	let collectiblesPerArea = NewGameStore.collectibles;

	function addCollectableToArea(areaId: number, collectibleEvent: CustomEvent<Collectible>) {
		const collectible = collectibleEvent.detail;

		$collectiblesPerArea.push({ ...collectible, areaId });
		$collectiblesPerArea = $collectiblesPerArea;
	}

	function deleteCollectable(localId: CustomEvent<number>) {
		$collectiblesPerArea = $collectiblesPerArea.filter(collectible => collectible.localId !== localId.detail);
	}
</script>

<Card title="Collectibles" double>
	<div class="flex h-[107%] flex-col overflow-scroll">
		<div class="my-2">
			<AddCollectibleRow
				collectibleTypes={$collectibleTypesStore}
				on:save={newCollectible => addCollectableToArea(-1, newCollectible)}
			/>
		</div>

		<div class="divide-y divide-surface-500/25">
			{#each $collectiblesPerArea.filter(collectible => collectible.areaId === -1) as collectible (collectible.localId)}
				<CollectibleRow bind:collectible on:delete={deleteCollectable} />
			{/each}
		</div>

		{#each $areas.filter(ar => ar.parentId === 0) as area (area.id)}
			{#if area.title}
				<div class="my-2">
					<AreaRow bind:area />
				</div>

				<div class="mb-2 ml-auto w-11/12">
					<AddCollectibleRow
						collectibleTypes={$collectibleTypesStore}
						on:save={newCollectible => addCollectableToArea(area.id, newCollectible)}
					/>
				</div>
				<div class="divide-y divide-surface-500/25">
					{#each $collectiblesPerArea.filter(collectible => collectible.areaId === area.id) as collectible (collectible.localId)}
						<div class="flex items-center justify-end py-2 first:pt-0 last:pb-0">
							<CornerDownRight />
							<div class="ml-2 w-11/12">
								<CollectibleRow bind:collectible on:delete={deleteCollectable} />
							</div>
						</div>
					{/each}
				</div>

				{#each $areas.filter(ar => ar.parentId === area.id) as childArea}
					<div class="ml-auto w-11/12">
						{#if childArea.title}
							<div class="ml-2 w-11/12">
								<div class="mt-2">
									<AreaRow bind:area={childArea} />
								</div>
								<div class="my-2 ml-auto w-11/12">
									<AddCollectibleRow
										collectibleTypes={$collectibleTypesStore}
										on:save={newCollectible => addCollectableToArea(childArea.id, newCollectible)}
									/>
								</div>

								<div class="divide-y divide-surface-500/25">
									{#each $collectiblesPerArea.filter(collectible => collectible.areaId === childArea.id) as collectible (collectible.localId)}
										<div class="flex items-center justify-end py-2 first:pt-0 last:pb-0">
											<CornerDownRight />
											<div class="ml-2 w-11/12">
												<CollectibleRow bind:collectible on:delete={deleteCollectable} />
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		{/each}
	</div>
</Card>
