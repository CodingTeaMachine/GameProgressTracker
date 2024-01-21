<script lang="ts">
	/**
	 * Does the card take up 2 columns in the grid
	 */
	export let double = false;

	/**
	 * Does the card take up 4 columns in the grid
	 */
	export let quad = false;

	/**
	 * The title of the card
	 */
	export let title: string;
</script>

<div class="card max-h-[58rem] min-h-[29rem] overflow-y-scroll p-4" class:double class:quad>
	<h2 class="mb-1 text-lg before:mr-2 before:rounded-sm before:bg-secondary-500 before:content-['\00a0']">
		{title}
	</h2>
	<div class="h-[90%]">
		<slot />
	</div>
</div>

<style lang="postcss">
	.double {
		@apply col-span-2;
	}
	.quad {
		@apply col-span-4;
	}
</style>
