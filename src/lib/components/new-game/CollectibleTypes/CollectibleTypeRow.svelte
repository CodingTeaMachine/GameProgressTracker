<script lang="ts" context="module">
	import type { CollectibleType } from '$types/domain/collectibleType';
	import { writable } from 'svelte/store';

	export let editedId = writable<number | null>(null);
	export let editedValue = writable<CollectibleType | null>();
</script>

<script lang="ts">
	import { Save, Trash, X, Box } from 'lucide-svelte';
	import type { CollectibleType } from '$/lib/types/domain/collectibleType';
	import { createEventDispatcher } from 'svelte';
	import CoverImageUploadWithPreview from '../CoverImageUploadWithPreview.svelte';
	import FormTextInput from '../../input/FormTextInput.svelte';
	import { Modals } from '$lib/helpers/modals.js';

	export let collectibleType: CollectibleType;

	$: editingInProgress = $editedId !== null && $editedId === collectibleType.id;

	$: {
		if (editingInProgress && titleInputRef) {
			//If we create a new area, the input doesn't get created fast enough to be focusable
			//So we need to wait a bit...
			setTimeout(() => {
				titleInputRef.focus();
			}, 10);
		}
	}

	type Events = {
		delete: number;
		update: CollectibleType;
	}

	const dispatch = createEventDispatcher<Events>();

	let titleInputRef: HTMLInputElement;

	function deleteRow() {
		dispatch('delete', collectibleType.id);
	}

	function editRow() {
		$editedId = collectibleType.id;
		$editedValue = { ...collectibleType };
	}

	function saveEdit() {
		if ($editedValue !== null) {
			if ($editedValue.title === '' && $editedValue.description === '') {
				dispatch('delete', $editedValue.id);
				endEdit();
			} else if ($editedValue.title === '') {
				Modals.alert('Alert', 'The title cannot be empty');
			} else {
				dispatch('update', { ...$editedValue } as CollectibleType);
				endEdit();
			}
		}
	}

	function cancelEdit() {
		if (collectibleType.title === '' && collectibleType.description === '') {
			deleteRow();
		}

		endEdit();
	}

	function endEdit() {
		$editedId = null;
		$editedValue = null;
	}

	function setEditedValue(field: 'title' | 'description' | 'imageSrc', newValue: CustomEvent<string | number>) {
		if ($editedValue == null) {
			$editedValue = { ...collectibleType };
		}
		
		$editedValue[field] = newValue.detail;
	}
</script>

<div
	class="flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 duration-75 hover:bg-surface-700"
	class:py-3={editingInProgress}
>
	<!--svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events-->
	<div
		class="flex w-full items-center gap-4"
		class:h-20={editingInProgress}
		class:h-14={!editingInProgress}
		on:click={() => {
			editingInProgress || editRow();
		}}
	>
		<div class="flex w-16 items-center justify-center">
			{#if editingInProgress}
				<div class="h-12 w-12">
					<CoverImageUploadWithPreview
						hasText={false}
						on:upload={image => setEditedValue('imageSrc', image)}
					/>
				</div>
			{:else if collectibleType.imageSrc}
				<!--svelte-ignore a11y-img-redundant-alt-->
				<img src={collectibleType.imageSrc} alt="cover image" class="h-full rounded-md" />
			{:else}
				<Box />
			{/if}
		</div>

		<div class="flex h-full w-full flex-col justify-evenly">
			{#if editingInProgress}
				<div class="mb-2">
					<FormTextInput
						bind:inputRef={titleInputRef}
						name="Title"
						placeholder="Title..."
						value={$editedValue?.title}
						on:input={newValue => setEditedValue('title', newValue)}
					/>
				</div>

				<FormTextInput
					name="Description"
					placeholder="Description..."
					value={$editedValue?.description}
					on:input={newValue => setEditedValue('description', newValue)}
				/>
			{:else}
				<div class="text-lg font-bold">{collectibleType.title}</div>
				{#if collectibleType.description}
					<div class="opacity-50">{collectibleType.description}</div>
				{/if}
			{/if}
		</div>
	</div>
	<div class="flex flex-row gap-1">
		{#if editingInProgress}
			<button class="bg-initial btn-icon hover:text-success-500" on:click={saveEdit}>
				<Save />
			</button>
			<button class="bg-initial btn-icon hover:text-error-500" on:click={cancelEdit}>
				<X />
			</button>
		{:else}
			<button class="bg-initial btn-icon hover:text-error-500" on:click={deleteRow}>
				<Trash />
			</button>
		{/if}
	</div>
</div>
