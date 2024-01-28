<script lang="ts">
	import RequiredStar from '$lib/components/ui/RequiredStar.svelte';

	/**
	 * Label of the checkbox
	 */
	export let label: string;

	/**
	 * Current value of the checkbox
	 */
	export let checked: boolean = false;

	/**
	 * The name of the input (used in forms)
	 */
	export let name: string;

	/**
	 * Is the input required
	 */
	export let required: boolean = false;
</script>

<label class="flex items-center space-x-2">
	<input class="checkbox" type="checkbox" bind:checked {name} />
	<p>
		{label}
		{#if required}
			<RequiredStar/>
		{/if}
	</p>
</label>
