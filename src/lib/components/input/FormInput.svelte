<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Icon } from '$types/types';

	/**
	 * The text displayed above the input
	 */
	export let label: string;

	/**
	 * The errors associated with the input, displayed under the input
	 */
	export let errors: string[] | undefined = undefined;

	/**
	 * The type of the input
	 */
	export let type: 'text' | 'password' | 'email' = 'text';

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
	export let placeholder: string = '';

	/**
	 * The value of the input
	 */
	export let value = '';

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}

	$: showing = {
		error: !!errors
	};

	function inputEventHandler(event: InputEvent) {
		showing.error = false;

		value = (event.target as HTMLInputElement).value;
		const dispatch = createEventDispatcher();
		dispatch('input', value);
	}

	let hasPrefix = $$slots.icon || prefixIcon !== null;
</script>

<label class="label">
	<span>{label}</span>
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
			aria-invalid={errors ? 'true' : undefined}
			class:input-error={showing.error}
			{placeholder}
			{name}
			on:input={inputEventHandler}
		/>
	</div>
	{#if errors}<div class="mt-2 text-red-500">{errors[0]}</div>{/if}
</label>
