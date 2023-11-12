<script lang="ts">
	import { NewGameStore } from '$lib/stores/new-game/newGameStore';
	import { Plus } from 'lucide-svelte';
	import Card from '../Card.svelte';
	import CollectibleTypeRow, { editedId, editedValue } from './CollectibleTypeRow.svelte';
	import type { CollectibleType } from '$/lib/types/types';

	const collectibleTypesStore = NewGameStore.collectibleTypes;

	$: editingInProgress = $editedId !== null;

	let localId = 1;

	function addRow() {
		const newCollectibleType = {
			id: localId++,
			title: '',
			description: '',
			image: undefined,
			imageSrc: ''
		};

		$collectibleTypesStore.unshift({ ...newCollectibleType });
		$collectibleTypesStore = $collectibleTypesStore;

		$editedId = newCollectibleType.id;
		$editedValue = { ...newCollectibleType };
	}

	function updateRow(updateData: CustomEvent<CollectibleType>) {
		$collectibleTypesStore = $collectibleTypesStore.map(area => {
			if (area.id === updateData.detail.id) {
				return { ...updateData.detail };
			}
			return area;
		});
	}

	function deleteRow(rowId: CustomEvent<number>) {
		$collectibleTypesStore = $collectibleTypesStore.filter(collectibleType => collectibleType.id !== rowId.detail);
	}
</script>

<Card title="Collectible Types" double>
	<button class="variant-filled-secondary btn btn-sm mb-4 mt-2" on:click={addRow} disabled={editingInProgress}>
		<span><Plus /></span>
		<span>Add new collectible type</span>
	</button>

	<div class="flex h-5/6 flex-col gap-2 overflow-scroll">
		{#each $collectibleTypesStore as collectibleType (collectibleType.id)}
			<CollectibleTypeRow bind:collectibleType on:delete={deleteRow} on:update={updateRow} />
		{/each}
	</div>
</Card>
