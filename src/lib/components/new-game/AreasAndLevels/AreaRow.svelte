<script lang="ts" context="module">
	export let editedId = writable<number | null>(null);
	export let editedValue = writable<AreaInput | null>();
</script>

<script lang="ts">
	import { Save, Trash, Map, X, CornerDownRight } from 'lucide-svelte';
	import type { AreaInput } from '$/lib/types/types';
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import CoverImageUploadWithPreview from '../CoverImageUploadWithPreview.svelte';
	import FormTextInput from '../../input/FormTextInput.svelte';
	import { Modals } from '$lib/helpers/modals.js';

	export let area: AreaInput;
	export let canHaveChildren: boolean = true;

	$: editingInProgress = $editedId !== null && $editedId === area.id;

	$: {
		if (editingInProgress && titleInputRef) {
			//If we create a new area, the input doesn't get created fast enough to be focusable
			//So we need to wait a bit...
			setTimeout(() => {
				titleInputRef.focus();
			}, 10);
		}
	}

	interface Events {
		delete: number;
		addChild: number;
		update: AreaInput;
	}

	const dispatch = createEventDispatcher<Events>();

	let titleInputRef: HTMLInputElement;

	function deleteRow() {
		dispatch('delete', area.id);
	}

	function addChild() {
		dispatch('addChild', area.id);
	}

	function editRow() {
		$editedId = area.id;
		$editedValue = { ...area };
	}

	function saveEdit() {
		if ($editedValue !== null) {
			if ($editedValue.title === '' && $editedValue.description === '') {
				dispatch('delete', $editedValue.id);
				endEdit();
			} else if ($editedValue.title === '') {
				Modals.alert('Alert', 'The title cannot be empty');
			} else {
				dispatch('update', { ...$editedValue } as AreaInput);
				endEdit();
			}
		}
	}

	function cancelEdit() {
		if (area.title === '' && area.description === '') {
			deleteRow();
		}

		endEdit();
	}

	function endEdit() {
		$editedId = null;
		$editedValue = null;
	}

	function setEditedValue(field: 'title' | 'description' | 'imageSrc', newValue: CustomEvent<string>) {
		if ($editedValue == null) {
			$editedValue = { ...area };
		}

		$editedValue[field] = newValue.detail;
	}
</script>

<div
	class="flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 duration-75 hover:bg-surface-700"
>
	<div
		class="flex w-full items-center gap-4"
		class:h-20={editingInProgress}
		class:h-16={!editingInProgress}
		on:click={() => {
			editingInProgress || editRow();
		}}
	>
		<div class="flex h-full w-16 items-center justify-center">
			{#if editingInProgress}
				<div class="h-12 w-12">
					<CoverImageUploadWithPreview
						uploadedImages={area.image}
						hasText={false}
						on:upload={image => setEditedValue('imageSrc', image)}
					/>
				</div>
			{:else if area.imageSrc}
				<img src={area.imageSrc} alt="cover image" class="h-full rounded-md" />
			{:else}
				<Map />
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
				<div class="text-lg font-bold">{area.title}</div>
				<div class="opacity-50">{area.description}</div>
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
			{#if canHaveChildren}
				<button class="bg-initial btn-icon hover:text-secondary-500" on:click={addChild}>
					<CornerDownRight />
				</button>
			{/if}
			<button class="bg-initial btn-icon hover:text-error-500" on:click={deleteRow}>
				<Trash />
			</button>
		{/if}
	</div>
</div>
