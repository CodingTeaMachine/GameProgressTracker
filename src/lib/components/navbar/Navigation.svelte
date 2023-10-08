<script lang="ts" ✂prettier:content✂="CglpbXBvcnQgeyBwYWdlIH0gZnJvbSAnJGFwcC9zdG9yZXMnOwoJaW1wb3J0IHsgdXNlclN0b3JlIH0gZnJvbSAnJGxpYi9zdG9yZXMvdXNlcic7CgoJY29uc3QgeyBpc0xvZ2dlZEluIH0gPSB1c2VyU3RvcmU7CgoJaW1wb3J0IE5hdmJhckxpbmsgZnJvbSAnJGxpYi9jb21wb25lbnRzL25hdmJhci9OYXZiYXJMaW5rLnN2ZWx0ZSc7CglpbXBvcnQgeyBuYXZiYXJMaW5rcyB9IGZyb20gJyRsaWIvZGF0YS9wYWdlcyc7Cg==">{}</script>

<nav class="list-nav h-full p-4">
	<ul class="flex flex-col gap-3">
		{#each navbarLinks as link}
			{#if !link.protected || $isLoggedIn}
				<NavbarLink {link} active={'/' + $page.url.pathname.split('/')[1] === link.destination} />
			{/if}
		{/each}
	</ul>
</nav>
