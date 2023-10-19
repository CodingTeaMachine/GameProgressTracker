<script lang="ts">
	import AddRowIcon from './AddRowIcon.svelte';

	let editing: boolean = false;

	let title = 'Title';
	let description = 'Description';

	function inputKeydownEvent(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			editing = false;
		}
	}
</script>

<div class="flex flex-row items-center gap-4">
	<AddRowIcon />
	<div class="flex flex-col">
		{#if !editing}
			<span on:click={() => (editing = true)}>
				<div class="font-bold">{title}</div>
				<div class="text-sm opacity-50">{description}</div>
			</span>
		{:else}
			<input bind:value={title} class="input mb-2 h-8 w-48" on:keydown={inputKeydownEvent} />
			<input bind:value={description} class="input h-8 w-48" on:keydown={inputKeydownEvent} />
		{/if}
	</div>
</div>
