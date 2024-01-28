<script lang="ts">
	import RichTextEditor from '$lib/components/input/RichTextEditor.svelte';
	import Card from "$lib/components/new-game/Card.svelte";
	import RequiredStar from '$lib/components/ui/RequiredStar.svelte';

	export let value = "";
</script>

<Card quad>
	<svelte:fragment slot="title">
		Description
		<RequiredStar/>
	</svelte:fragment>
	<div class="h-[90%]">
		<RichTextEditor bind:value/>
	</div>
</Card>
