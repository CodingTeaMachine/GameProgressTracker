<script lang="ts">
	import { FileDropzone } from "@skeletonlabs/skeleton";
	import {Camera} from 'lucide-svelte';
	import Card from '$lib/components/new-game/card.svelte';
</script>

<form class="mx-4 mb-10 grid h-[125%] grid-rows-3 gap-4 pr-4">
	<section class="card-row">
		<Card title="Cover Image">
			<FileDropzone name="coverImage" class="w-1/2 aspect-cover mx-auto" accept=".png, .jpg, .jpeg">
				<svelte:fragment slot="lead"><Camera class="mx-auto"/></svelte:fragment>
				<svelte:fragment slot="message">Cover image</svelte:fragment>
				<svelte:fragment slot="meta">.png .jpg .jpeg</svelte:fragment>
			</FileDropzone>
		</Card>
		<Card title="General" />
		<Card title="Miscellaneous" />
		<Card title="Developers" />
	</section>

	<section class="card-row">
		<Card title="Areas / Levels" double />
		<Card title="Achievements" double />
	</section>

	<section class="card-row">
		<Card title="Collectible Types" double />
		<Card title="Collectibles" double />
	</section>
</form>

<style>
	.card-row {
		@apply grid h-full grid-cols-4 gap-4;
	}
</style>
