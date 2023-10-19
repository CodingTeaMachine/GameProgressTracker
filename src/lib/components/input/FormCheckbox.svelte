<script lang="ts">
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
</script>

<label class="flex items-center space-x-2">
	<input class="checkbox" type="checkbox" bind:checked {name} />
	<p>{label}</p>
</label>
