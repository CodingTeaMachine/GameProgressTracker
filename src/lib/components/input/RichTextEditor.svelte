<script lang="ts">
	import { onMount } from 'svelte';
	
	export let value: string = "";
	
	
	let editor: HTMLElement;
	
	const toolbarOptions = [
		[{ 'font': [] }],
		[{ 'header': [1, 2, 3, false] }],
		["bold", "italic", "underline"],
		["blockquote", "link"],
		[{ list: "ordered" }, { list: "ordered" }],
		[{ 'indent': '-1'}, { 'indent': '+1' }],
		[{ 'color': [] }, { 'background': [] }],
		[{ align: [] }],
	];
	
	onMount(async () => {

		const { default: Quill } = await import("quill");

		const quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: "snow",
			placeholder: "What is the game about..."
		});
		
		quill.on('text-change', () => value = quill.root.innerHTML);
		
	});
</script>

<div bind:this={editor}/>

<style>
    @import '$lib/assets/styles/external/quill-1.3.6.css';
</style>
