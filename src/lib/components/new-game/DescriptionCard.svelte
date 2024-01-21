<script lang="ts">
	import RichTextEditor from '$lib/components/input/RichTextEditor.svelte';
	import Card from "$lib/components/new-game/Card.svelte";

	export let value = "";
</script>

<Card title="Description" quad>
	<div class="h-[90%]">
		<RichTextEditor bind:value/>
	</div>
</Card>
