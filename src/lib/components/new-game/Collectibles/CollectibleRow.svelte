<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	let editingInProgress = writable<boolean>(false);
</script>

<script lang="ts">
	import { Save, Trash, Map, X } from 'lucide-svelte';
	import type { Collectible, CollectibleType, CollectibleWithAreaId } from '$/lib/types/types';
	import { createEventDispatcher, onMount } from 'svelte';
	import FormTextInput from '../../input/FormTextInput.svelte';
	import FormSelect from '../../input/FormSelect.svelte';
	import { NewGameStore } from '$/lib/stores/new-game/newGameStore';

	export let collectible: CollectibleWithAreaId;

	$: isCurrentCollectibleEdited = $editingInProgress && $editedValue !== null;

	const collectibleTypes = NewGameStore.collectibleTypes;
	const dispatch = createEventDispatcher<{ delete: number; update: Collectible }>();

	const collectibleType = writable<CollectibleType>(
		NewGameStore.getCollectibleTypeById(collectible.collectibleTypeId)
	);
	const editedValue = writable<Collectible | null>(null);

	onMount(() => {
		NewGameStore.collectibleTypes.subscribe(() => {
			$collectibleType = NewGameStore.getCollectibleTypeById(collectible.collectibleTypeId);
		});
	});

	function startEditing() {
		if ($editingInProgress === true) {
			return;
		}
		$editingInProgress = true;
		$editedValue = {
			localId: collectible.localId,
			collectibleTypeId: collectible.collectibleTypeId,
			totalAmount: collectible.totalAmount
		};
	}

	function updateCollectible() {
		if ($editedValue !== null) {
			collectible.collectibleTypeId = $editedValue.collectibleTypeId;
			collectible.totalAmount = $editedValue.totalAmount;

			$collectibleType = NewGameStore.getCollectibleTypeById(collectible.collectibleTypeId);
		}

		finishEditing();
	}

	function deleteRow() {
		dispatch('delete', collectible.localId);
		finishEditing();
	}

	function finishEditing() {
		$editingInProgress = false;
		$editedValue = null;
	}
</script>

<div class="flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 duration-75 hover:bg-surface-700">
	<!--svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events-->
	<div
		class="flex w-full items-center gap-4"
		class:h-10={!isCurrentCollectibleEdited}
		class:h-14={isCurrentCollectibleEdited}
		on:click={() => {
			isCurrentCollectibleEdited || startEditing();
		}}
	>
		<div class="flex h-full w-16 items-center justify-center">
			{#if $collectibleType.imageSrc}
				<!--svelte-ignore a11y-img-redundant-alt-->
				<img src={$collectibleType.imageSrc} alt="cover image" class="h-full rounded-md" />
			{:else}
				<Map />
			{/if}
		</div>

		<div class="flex h-full w-full flex-row items-center gap-5 divide-x">
			<!--the null check is for ts to know that $editedValue is not null, but technically it's useless-->
			{#if isCurrentCollectibleEdited && $editedValue !== null}
				<div class="w-1/2">
					<FormSelect
						initialValue={$editedValue.collectibleTypeId}
						items={$collectibleTypes}
						name="addCollectibleTypeToArea"
						valueKey="id"
						valueLabel="title"
						on:change={newValue =>
							$editedValue !== null && ($editedValue.collectibleTypeId = newValue.detail.id)}
					/>
				</div>
				<div class="w-1/5 pl-5">
					<!-- @ts-ignore -->
					<FormTextInput
						bind:value={$editedValue.totalAmount}
						name="CollectibleCount"
						type="number"
						placeholder="Total Amount"
					/>
				</div>
			{:else}
				<div class="text-lg font-bold">{$collectibleType.title}</div>
				<div class="pl-5 text-lg font-bold">{collectible.totalAmount}</div>
			{/if}
		</div>
	</div>
	<div class="flex flex-row gap-1">
		{#if isCurrentCollectibleEdited}
			<button class="bg-initial btn-icon hover:text-success-500" on:click={updateCollectible}>
				<Save />
			</button>
			<button class="bg-initial btn-icon hover:text-error-500" on:click={finishEditing}>
				<X />
			</button>
		{:else}
			<button class="bg-initial btn-icon hover:text-error-500" on:click={deleteRow}>
				<Trash />
			</button>
		{/if}
	</div>
</div>
