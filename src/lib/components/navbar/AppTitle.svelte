<script>
	import { CircleDotDashed } from 'lucide-svelte';
	import { navbarStore } from '$lib/stores/navbar';

	const { isNavbarOpen } = navbarStore;
</script>

<a href="/" class:w-fit={!$isNavbarOpen} class:mx-3={!$isNavbarOpen} class="transition-width duration-200 ease-out">
	<div class="flex h-14 w-fit flex-row items-center justify-center px-5">
		<CircleDotDashed />
		<span class="pl-2 text-xl flex" class:hidden={!$isNavbarOpen}>
			<span class="text-primary-500">G</span>ame <span class="text-primary-500">P</span>rogress
			<span class="text-primary-500">T</span>racker
		</span>
	</div>
</a>
