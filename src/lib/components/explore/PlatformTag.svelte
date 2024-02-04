<script lang="ts">
	import type { ExplorePagePlatform } from '$types/domain/platform';

	export let platform: ExplorePagePlatform;
</script>

<span class="badge variant-filled rounded-md text-xs opacity-70">{platform.shorthand ?? platform.name}</span>
