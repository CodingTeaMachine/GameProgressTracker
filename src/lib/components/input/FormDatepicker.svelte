<script lang="ts">
	import RequiredStar from '$lib/components/ui/RequiredStar.svelte';
	import Flatpickr from 'svelte-flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	import 'flatpickr/dist/themes/dark.css';

	/**
	 * The currently selected date or null
	 */
	export let value: Date | null = null;

	/**
	 * The label of the input
	 */
	export let label: string = '';

	/**
	 * Is the title bold
	 */
	export let boldTitle: boolean = false;

	/**
	 * The name of the input
	 */
	export let name: string;

	/**
	 * Is the input required
	 */
	export let required: boolean = false;

	/**
	 * Placeholder string displayed when the input is empty
	 */
	export let placeholder: string = 'YYYY-MM-DD';
</script>

<!--svelte-ignore a11y-label-has-associated-control -->
<label class="label">
	{#if label}
		<span class:font-bold={boldTitle}>{label}</span>
		{#if required}
			<RequiredStar/>
		{/if}
	{/if}
	<div class="input-group input-group-divider cursor-pointer grid-cols-[auto_1fr_auto]">
		<Flatpickr bind:value class="input w-full !cursor-pointer !bg-transparent" {name} {placeholder}/>
	</div>
</label>
