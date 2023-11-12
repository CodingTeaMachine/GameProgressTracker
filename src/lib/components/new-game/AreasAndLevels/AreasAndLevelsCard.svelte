<script lang="ts">
	import { NewGameStore } from "$lib/stores/new-game/newGameStore";
    import { Plus } from 'lucide-svelte';
	import Card from '../Card.svelte';
	import AreaRow, { editedId, editedValue } from './AreaRow.svelte';
	import type { ParentArea, AreaInput, Area } from '$/lib/types/types';

	const areas = NewGameStore.areas;
	
	$: editingInProgress = $editedId !== null;
	
	
	let localId = 1;
	function addRow() {
		const newArea = {
			id: localId++,
			title: '',
			description: '',
			image: undefined,
			imageSrc: '',
			children: []
		};

		$areas.unshift({ ...newArea });
		$areas = $areas;

		$editedId = newArea.id;
		$editedValue = { ...newArea };
	}

	function addChild(areaId: CustomEvent<number>) {
		const id = localId++;

		$areas
			.find(area => area.id === areaId.detail)
			?.children.unshift({
				id,
				title: '',
				description: '',
				image: undefined,
				imageSrc: ''
			});
		$areas = $areas;

		$editedId = id;
	}

	function updateRow(updateData: CustomEvent<AreaInput>) {
		const parentUpdateData = updateData.detail as ParentArea;

		$areas = $areas.map(area => {
			if (area.id === parentUpdateData.id) {
				return { ...parentUpdateData };
			}
			return area;
		});
	}

	function updateChild(updateData: CustomEvent<AreaInput>) {
		const childUpdateData = updateData.detail as Area;

		$areas = $areas.map(area => ({
			...area,
			children: area.children.map(childArea => {
				if (childArea.id === childUpdateData.id) {
					return { ...childUpdateData };
				}
				return area;
			})
		}));
	}

	function deleteRow(rowId: CustomEvent<number>) {
		$areas = $areas.filter(area => area.id !== rowId.detail);
	}

	function deleteChildRow(childId: CustomEvent<number>) {
		$areas = $areas.map(area => ({ ...area, children: area.children.filter(child => child.id !== childId.detail) }));
	}
</script>

<Card title="Areas / Levels" double>
	<button class="variant-filled-secondary btn btn-sm mb-4 mt-2" on:click={addRow} disabled={editingInProgress}>
		<span><Plus /></span>
		<span>Add new area/level</span>
	</button>

	<div class="flex h-5/6 flex-col gap-2 overflow-scroll">
		{#each $areas as area (area.id)}
			<AreaRow bind:area on:delete={deleteRow} on:addChild={addChild} on:update={updateRow} />
			{#if area.children}
				{#each area.children as childArea}
					<div class="ml-auto w-11/12">
						<AreaRow
							bind:area={childArea}
							canHaveChildren={false}
							on:delete={deleteChildRow}
							on:update={updateChild}
						/>
					</div>
				{/each}
			{/if}
		{/each}
	</div>
</Card>
