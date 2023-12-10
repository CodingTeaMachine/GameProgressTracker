<script lang="ts">
	// import { createEventDispatcher } from 'svelte';

	/**
	 * The text displayed above the input
	 */
	export let label: string;

	/**
	 * The errors associated with the input, displayed under the input
	 */
	export let errors: string[] | undefined = undefined;

	/**
	 * The name of the input (used in forms)
	 */
	export let name: string;

	/**
	 * The placeholder text displayed in the input
	 */
	export let placeholder: string = label + '...';

	/**
	 * The value of the input
	 */
	export let value = '';

	/**
	 * Is the title bold
	 */
	export let boldTitle: boolean = false;

	/**
	 * The amount of rows a textarea has
	 */
	export let rows: number = 1;

	$: showing = {
		error: !!errors
	};

	// const dispatch = createEventDispatcher<{input: string}>();
	
	// function inputEventHandler(event: InputEvent) {
	// 	showing.error = false;
	// 	value = (event.target as HTMLInputElement).value;
	// 	dispatch('input', value);
	// }
</script>

<label class="label">
	<span class:font-bold={boldTitle}>{label}</span>
	<textarea
		bind:value
		class="textarea"
		class:input-error={showing.error}
		aria-invalid={errors ? 'true' : undefined}
		{rows}
		{placeholder}
		{name}
	/>
	{#if errors}<div class="mt-2 text-red-500">{errors[0]}</div>{/if}
</label>
