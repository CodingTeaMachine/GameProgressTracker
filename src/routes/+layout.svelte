<script lang="ts">
	import '../app.pcss';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import FaviconBlack from '$assets/icons/favicon-black.svg';
	import FaviconWhite from '$assets/icons/favicon-white.svg';
	import ToggleNavbar from '$lib/components/navbar/ToggleNavbar.svelte';
	import { Modals } from '$lib/helpers/modals';
	import { navbarStore } from '$lib/stores/navbar';
	import { AppShell, getModalStore, Modal, Toast } from '@skeletonlabs/skeleton';
	import Header from '$lib/components/Header.svelte';
	import NavbarLinks from '$lib/components/navbar/NavbarLinks.svelte';
	import AppTitle from '$lib/components/navbar/AppTitle.svelte';
	import UserBar from '$lib/components/navbar/UserBar.svelte';
	import { pageTitle, pageIcon } from '$lib/stores/page';
	import { pages } from '$lib/data/pages';
	import type { Link } from '$types/page.ts';
	import { CircleDotDashed } from 'lucide-svelte';
	import { initializeStores } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';
	import { userStore } from '$lib/stores/user';

	export let data: PageData;

	const { user } = userStore;
	const { isNavbarOpen } = navbarStore;


	initializeStores();
	const modalStore = getModalStore();
	
	Modals.setModalStore(modalStore);

	let favicon = FaviconBlack;
	if (browser) {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			favicon = FaviconWhite;
		}

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
			favicon = event.matches ? FaviconWhite : FaviconBlack;
		});
	}

	$: {
		const paths = $page.url.pathname.split('/');
		const mainRoute = '/' + paths[1];

		const currentRoute = pages.find((link: Link) => link.destination === mainRoute);

		$pageTitle = currentRoute?.title ?? 'GameProgressTracker';
		$pageIcon = currentRoute?.icon ?? CircleDotDashed;
	}

	$: {
		data.user !== null ? user.login(data.user) : user.logout();
	}
</script>

<svelte:head>
	<title>GameProgressTracker</title>
	<link rel="icon" type="image/svg" href={favicon} />
</svelte:head>

<Toast position="tr" max="10" />
<Modal />

<AppShell>
	<svelte:fragment slot="pageHeader">
		<Header />
	</svelte:fragment>
	
	<svelte:fragment slot="sidebarLeft">
		<div
			class="mr-4 flex h-full flex-col justify-between border-r border-surface-50/10 bg-surface-900 w-72 transition-width duration-200 ease-out"
			class:!w-20={!$isNavbarOpen}
		>
			<AppTitle />
			<ToggleNavbar />
			<NavbarLinks />
			<UserBar />
		</div>
	</svelte:fragment>
	
	<slot />
</AppShell>
