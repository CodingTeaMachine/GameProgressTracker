<script lang="ts">
	import RequiredStar from '$lib/components/ui/RequiredStar.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Icon } from '$types/clientTypes';

	/**
	 * The text displayed above the input
	 */
	export let label: string = '';

	/**
	 * The errors associated with the input, displayed under the input
	 */
	export let errors: string[] | undefined = undefined;

	/**
	 * The type of the input
	 */
	export let type: 'text' | 'password' | 'email' | 'number' = 'text';

	/**
	 * If we want an icon before the input, it can be provided here
	 */
	export let prefixIcon: Icon | null = null;

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
	export let value: string | number | null = '';

	/**
	 * Is the title bold
	 */
	export let boldTitle: boolean = false;

	/**
	 * The input instance
	 */
	export let inputRef: HTMLInputElement | null = null;

	/**
	 * Is the input required
	 */
	export let required: boolean = false;

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}

	$: showing = {
		error: !!errors
	};

	type Events = {
		input: string | number;
	};

	const dispatch = createEventDispatcher<Events>();

	function inputEventHandler(event: Event) {
		showing.error = false;

		value = (event.target as HTMLInputElement).value;

		if(type === 'number') {
			value = Number(value);
		}
		
		dispatch('input', value);
	}
	
	$: {
		if(type === 'number') {
			value = Number(value);
		}
	}

	let hasPrefix = $$slots.icon || prefixIcon !== null;
</script>

<label class="label">
	{#if label}
		<span class:font-bold={boldTitle}>{label}</span>
		{#if required}
			<RequiredStar/>
		{/if}
	{/if}
	{#if hasPrefix}
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			{#if hasPrefix}
				<div class="input-group-shim">
					<slot name="icon">
						<svelte:component this={prefixIcon} />
					</slot>
				</div>
			{/if}

			<input
				use:typeAction
				bind:value
				bind:this={inputRef}
				aria-invalid={errors ? 'true' : undefined}
				class:input-error={showing.error}
				{placeholder}
				{name}
				{required}
				on:input={inputEventHandler}
			/>
		</div>
	{:else}
		<input
			use:typeAction
			bind:value
			bind:this={inputRef}
			aria-invalid={errors ? 'true' : undefined}
			class:input-error={showing.error}
			class="input"
			{placeholder}
			{name}
			on:input={inputEventHandler}
		/>
	{/if}

	{#if errors}<div class="mt-2 text-red-500">{errors[0]}</div>{/if}
</label>
