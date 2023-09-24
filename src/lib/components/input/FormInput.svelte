<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Icon } from '$types/types';

	export let label: string;
	export let errors: string[] | undefined = undefined;
	export let type: 'text' | 'password' | 'email' = 'text';
	export let prefixIcon: Icon | null = null;
	export let name: string;
	export let placeholder: string = '';

	export let value = '';

	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}

	$: showing = {
		error: !!errors
	};

	const dispatch = createEventDispatcher();
	function inputEventHandler(event: InputEvent) {
		showing.error = false;

		value = (event.target as HTMLInputElement).value;
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
			aria-invalid={errors ? 'true' : undefined}
			class:input-error={showing.error}
			{placeholder}
			bind:value
			{name}
			on:input={inputEventHandler}
		/>
	</div>
	{#if errors}<div class="mt-2 text-red-500">{errors[0]}</div>{/if}
</label>
