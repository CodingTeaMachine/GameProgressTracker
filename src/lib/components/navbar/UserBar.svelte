<script lang="ts">
	import { navbarStore } from '$lib/stores/navbar';
	import { Avatar } from '@skeletonlabs/skeleton';
	import placeholderAvatarImage from '$assets/images/avatar_placeholder_cropped.jpg';
	import { userStore } from '$lib/stores/user';
	import { LogIn, LogOut } from 'lucide-svelte';
	import { Pages, Endpoints } from '$types/enums/pages';

	const { isLoggedIn, user } = userStore;
	$: avatarLinkDestination = $isLoggedIn ? Pages.PROFILE : Pages.LOGIN;

	const {isNavbarOpen} = navbarStore;
</script>

<div
	class="flex h-20 items-center justify-between border-t border-surface-50/10 p-5"
	class:w-fit={!$isNavbarOpen}
	class:mx-auto={!$isNavbarOpen}
	class:px-0={!$isNavbarOpen}
>
	<a href={avatarLinkDestination}>
		{#if $isLoggedIn}
			<Avatar
				src={placeholderAvatarImage}
				cursor="cursor-pointer"
				background="bg-surface-800"
				class="border-surface-300-600-token h-10 !w-10 rounded-md border-2 hover:!border-primary-500"
			/>
		{:else}
			<button type="button" class="variant-ringed-primary btn-icon text-xl"> ? </button>
		{/if}
	</a>

	{#if $isNavbarOpen}
		{#if $isLoggedIn}
			<span class="font-bold">{$user.username}</span>
		{/if}

		{#if $isLoggedIn}
			<form method="POST" class:hidden={!$isNavbarOpen}>
				<button formaction={Endpoints.LOGOUT} type="submit" class="btn-icon">
					<LogOut />
				</button>
			</form>
		{:else}
			<a href={Pages.LOGIN} class="btn-icon" class:hidden={!$isNavbarOpen}>
				<LogIn />
			</a>
		{/if}
	{/if}
</div>
