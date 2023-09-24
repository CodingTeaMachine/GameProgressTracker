<script lang="ts">
	import type { Link } from '$types/page.ts';

	export let link: Link;
	export let active: boolean = false;
</script>

<li>
	<a class="flex items-center gap-2.5 capitalize" class:active href={link.destination}>
		<svelte:component this={link.icon} />
		<span class="!ml-0 pt-0.5 font-bold">
			{link.title}
		</span>
	</a>
</li>

<style lang="postcss">
	.active {
		background-color: rgb(var(--color-secondary-500)) !important;

		&:hover {
			background-color: rgb(var(--color-secondary-600)) !important;
		}
	}
</style>
