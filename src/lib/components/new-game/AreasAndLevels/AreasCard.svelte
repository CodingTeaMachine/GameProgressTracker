<script lang="ts">
	import type { Area } from "$types/domain/area";
	import { CornerDownRight } from 'lucide-svelte';
	import { NewGameStore } from '$lib/stores/new-game/newGameStore';
	import { Plus } from 'lucide-svelte';
	import Card from '../Card.svelte';
	import AreaRow, { editedId, editedValue } from './AreaRow.svelte';

	const areas = NewGameStore.areas;

	let localId: number = 1;

	$: editingInProgress = $editedId !== null;

	function addArea(parentAreaId: number | null) {
		const newArea = {
			id: localId++,
			title: '',
			description: '',
			image: undefined,
			imageSrc: '',
			parent_id: parentAreaId
		};

		$areas.push(newArea);
		$areas = $areas;

		$editedId = newArea.id;
		$editedValue = newArea;
	}

	function updateArea(updateDataEvent: CustomEvent<Area>) {
		const updateData = updateDataEvent.detail;

		$areas = $areas.map(area => {
			if (area.id === updateData.id) {
				return { ...updateData };
			}
			return area;
		});
	}

	function deleteArea(areaId: CustomEvent<number>) {
		$areas = $areas.filter(area => area.id !== areaId.detail);
	}
</script>

<Card title="Areas / Levels" double>
	<button
		class="variant-filled-secondary btn btn-sm mb-4 mt-2"
		on:click={() => addArea(null)}
		disabled={editingInProgress}
		type="button"
	>
		<span><Plus /></span>
		<span>Add new area/level</span>
	</button>

	<div class="flex h-5/6 flex-col divide-y divide-surface-500/25 overflow-scroll">
		{#each $areas.filter(ar => ar.parent_id === null) as area (area.id)}
			<div class="py-2 first:pt-0 last:pb-0">
				<AreaRow
					bind:area
					on:update={updateArea}
					on:delete={deleteArea}
					on:addChild={() => addArea(area.id)}
				/>
				{#if $areas.some(ar => ar.parent_id === area.id)}
					<div class="divide-y divide-surface-500/25">
						{#each $areas.filter(ar => ar.parent_id === area.id) as childArea (childArea.id)}
							<div class="py-2 first:pt-0 last:pb-0 flex items-center justify-end">
								<CornerDownRight/>
								<div class="ml-2 w-11/12">
									<AreaRow
										bind:area={childArea}
										canHaveChildren={false}
										on:delete={deleteArea}
										on:update={updateArea}
									/>
								</div>
							</div>
							
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</Card>
