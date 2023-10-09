<script lang="ts">
	/**
	 * Does the card take up 2 columns in the grid
	 */
	export let double = false;

	/**
	 * The title of the card
	 */
	export let title: string;
</script>

<div class="simple-card" class:double>
	<h2 class="text-lg mb-1">{title}</h2>
	<div class="h-[90%]">
		<slot/>
	</div>
</div>

<style>
	.simple-card {
        @apply card p-4 h-full max-w-full;
	}
	
	.double {
		@apply col-span-2;
	}
	
</style>
