<script lang="ts">
	import { navbarStore } from '$lib/stores/navbar';
	import type { Link } from '$types/page.ts';

	export let link: Link;
	export let active: boolean = false;

	const { isNavbarOpen } = navbarStore;
</script>

<li class:w-fit={!$isNavbarOpen}>
	<a class="flex h-12 items-center gap-2.5 capitalize" class:active href={link.destination}>
		<svelte:component this={link.icon} />
		<span class="!ml-0 pt-0.5 font-bold" class:hidden={!$isNavbarOpen}>
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
