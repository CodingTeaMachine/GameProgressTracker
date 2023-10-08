<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import placeholderAvatarImage from '$assets/images/avatar_placeholder_cropped.jpg';
	import { userStore } from '$lib/stores/user';
	import { LogIn, LogOut } from 'lucide-svelte';
	import { Pages, Endpoints } from '$types/enums/pages';

	const {isLoggedIn, user} = userStore;
	$: avatarLinkDestination = $isLoggedIn ? Pages.PROFILE : Pages.LOGIN;
</script>

<div class="flex items-center justify-between border-t border-surface-50/10 p-5">
	<a href={avatarLinkDestination}>
		{#if $isLoggedIn}
			<Avatar
				src={placeholderAvatarImage}
				cursor="cursor-pointer"
				background="bg-surface-800"
				class="border-surface-300-600-token h-10 !w-10 rounded-md border-2 hover:!border-primary-500"
			/>
		{:else}
			<button type="button" class="btn-icon variant-ringed-primary text-xl">
				?
			</button>
		{/if}
	</a>
	{#if $isLoggedIn}
		<span class="-ml-5 font-bold">{$user.username}</span>
	{/if}

	{#if $isLoggedIn}
		<form method="POST">
			<button formaction={Endpoints.LOGOUT} type="submit" class="btn-icon">
				<LogOut />
			</button>
		</form>
	{:else}
		<a href={Pages.LOGIN} class="btn-icon">
			<LogIn />
		</a>
	{/if}
</div>
