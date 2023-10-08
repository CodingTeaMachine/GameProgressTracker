<script lang="ts">
	import '../app.pcss';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import FaviconBlack from '$assets/icons/favicon-black.svg';
	import FaviconWhite from '$assets/icons/favicon-white.svg';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Header from '$lib/components/Header.svelte';
	import Navbar from '$lib/components/navbar/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AppTitle from '$lib/components/navbar/AppTitle.svelte';
	import UserBar from '$lib/components/navbar/UserBar.svelte';
	import { pageTitle, pageIcon } from '$lib/stores/page';
	import { pages } from '$lib/data/pages';
	import type { Link } from '$types/page.ts';
	import { CircleDotDashed } from 'lucide-svelte';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { Toast } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';
	import { userStore } from '$lib/stores/user';

	export let data: PageData;

	const { user } = userStore;

	initializeStores();

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

<Toast position="tr" />

<AppShell>
	<svelte:fragment slot="pageHeader">
		<Header />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<div class="mr-4 flex h-full flex-col justify-between border-r border-surface-50/10 bg-surface-900">
			<AppTitle />
			<Navbar />
			<UserBar />
		</div>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>
