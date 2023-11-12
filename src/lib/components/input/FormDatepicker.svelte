<script lang="ts">
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
</script>

<!--svelte-ignore a11y-label-has-associated-control -->
<label class="label">
	<span class:font-bold={boldTitle}>{label}</span>
	<div class="input-group input-group-divider cursor-pointer grid-cols-[auto_1fr_auto]">
		<Flatpickr class="input w-full !cursor-pointer !bg-transparent" bind:value />
	</div>
</label>
