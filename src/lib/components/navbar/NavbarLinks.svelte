<script lang="ts">
	import { page } from '$app/stores';
	import { userStore } from '$lib/stores/user';
	import NavbarLink from '$lib/components/navbar/NavbarLink.svelte';
	import { navbarLinks } from '$lib/data/pages';
	
	const { isLoggedIn } = userStore;
</script>

<nav class="list-nav h-full p-4">
	<ul class="flex flex-col gap-3">
		{#each navbarLinks as link}
			{#if !link.protected || $isLoggedIn}
				<NavbarLink {link} active={'/' + $page.url.pathname.split('/')[1] === link.destination} />
			{/if}
		{/each}
	</ul>
</nav>
