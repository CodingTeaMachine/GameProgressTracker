<script lang="ts">
	import { navbarStore } from '$lib/stores/navbar';
	import { PanelLeftClose, PanelLeftOpen } from 'lucide-svelte';
	
	const {isNavbarOpen} = navbarStore;
</script>


<div class="mx-4" class:w-fit={!$isNavbarOpen}>
	<button
		type="button"
		class="flex items-center justify-center gap-2 h-12 w-fit w-fit rounded-md hover:bg-primary-hover-token px-4 py-2"
		class:mx-auto={$isNavbarOpen}
		on:click={() => navbarStore.toggle()}
	>
		{#if $isNavbarOpen}
			<PanelLeftClose/>
			Close
		{:else}
			<PanelLeftOpen/>
		{/if}
	</button>
</div>
