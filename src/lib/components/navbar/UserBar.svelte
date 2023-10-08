<script lang="ts" ✂prettier:content✂="CglpbXBvcnQgeyBBdmF0YXIgfSBmcm9tICdAc2tlbGV0b25sYWJzL3NrZWxldG9uJzsKCWltcG9ydCBwbGFjZWhvbGRlckF2YXRhckltYWdlIGZyb20gJyRhc3NldHMvaW1hZ2VzL2F2YXRhcl9wbGFjZWhvbGRlcl9jcm9wcGVkLmpwZyc7CglpbXBvcnQgeyB1c2VyU3RvcmUgfSBmcm9tICckbGliL3N0b3Jlcy91c2VyJzsKCWltcG9ydCB7IExvZ0luLCBMb2dPdXQgfSBmcm9tICdsdWNpZGUtc3ZlbHRlJzsKCWltcG9ydCB7IFBhZ2VzLCBFbmRwb2ludHMgfSBmcm9tICckdHlwZXMvZW51bXMvcGFnZXMnOwoKCWNvbnN0IHsgaXNMb2dnZWRJbiwgdXNlciB9ID0gdXNlclN0b3JlOwoJJDogYXZhdGFyTGlua0Rlc3RpbmF0aW9uID0gJGlzTG9nZ2VkSW4gPyBQYWdlcy5QUk9GSUxFIDogUGFnZXMuTE9HSU47Cg==">{}</script>

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
