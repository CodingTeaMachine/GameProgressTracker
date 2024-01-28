<script lang="ts" context="module">
	export let localId = 0;
</script>

<script lang="ts">
	import type { CollectibleType } from '$/lib/types/domain/collectibleType';
	import FormCheckbox from '$lib/components/input/FormCheckbox.svelte';
	import type { Collectible } from '$types/domain/collectible';
	import { PlusSquare, Save, X } from 'lucide-svelte';
	import FormSelect from '../../input/FormSelect.svelte';
	import { createEventDispatcher } from 'svelte';
	import FormTextInput from '../../input/FormTextInput.svelte';

	export let collectibleTypes: CollectibleType[] = [];

	let editingInProgress = false;

	let selectedCollectibleTypeId: number | null = null;
	let totalAmount: number = 0;
	let title: string = "";
	let description: string = "";

	type Events = {
		save: Collectible;
	}

	const dispatch = createEventDispatcher<Events>();

	function saveEdit() {
		if (selectedCollectibleTypeId !== null) {
			dispatch('save', { collectibleTypeId: selectedCollectibleTypeId, totalAmount, title, description, localId: localId++ });
		}

		endEdit();
	}

	function cancelEdit() {
		endEdit();
	}

	function endEdit() {
		editingInProgress = false;
		selectedCollectibleTypeId = null;
		title = "";
		description = "";
		totalAmount = 0;
	}

	function editRow() {
		editingInProgress = true;
	}
</script>

<div
	class="flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 duration-75 hover:bg-surface-700"
	class:py-2={editingInProgress}
>
	<!--svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events-->
	<div
		class="flex h-fit w-full items-center gap-4"
		class:py-3={!editingInProgress}
		on:click={() => {
			editingInProgress || editRow();
		}}
	>
		<div class="flex h-full w-16 items-center justify-center">
			<PlusSquare />
		</div>

		<div class="flex h-full w-full flex-row flex-wrap items-center gap-5">
			{#if editingInProgress}
				<div class="w-1/2">
					<FormSelect
						bind:justValue={selectedCollectibleTypeId}
						name="addCollectibleTypeToArea"
						items={collectibleTypes}
						valueKey="id"
						valueLabel="title"
					/>
				</div>
				<div class="w-1/5">
					<FormTextInput
						bind:value={totalAmount}
						name="CollectibleCount"
						type="number"
						placeholder="Total Amount"
					/>
				</div>
				<div class="w-full">
					<FormTextInput
						bind:value={title}
						name="Title"
						placeholder="Title..."
					/>
				</div>
				<div class="w-full">
					<FormTextInput
						bind:value={description}
						name="Description"
						placeholder="Description..."
					/>
				</div>
				
			{:else}
				<div class="text-lg font-bold">Add new collectible</div>
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
		{/if}
	</div>
</div>
