<script lang="ts">
	import Card from "$lib/components/new-game/Card.svelte";
	import CoverImageUploadWithPreview from "$lib/components/new-game/CoverImageUploadWithPreview.svelte";

	let uploadedImages: FileList | undefined = undefined;
</script>

<form class="mx-4 mb-10 grid h-[125%] grid-rows-3 gap-4 pr-4">
	<section class="card-row">
		<Card title="Cover Image">
			<CoverImageUploadWithPreview bind:uploadedImages/>
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
