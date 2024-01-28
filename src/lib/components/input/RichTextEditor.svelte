<script lang="ts">
	import RequiredStar from '$lib/components/ui/RequiredStar.svelte';
	import { onMount } from 'svelte';

	/**
	 * The current value of the input
	 */
	export let value: string = "";

	/**
	 * Is the input required
	 */
	export let required: boolean = false;

	/**
	 * Is the title bold
	 */
	export let boldTitle: boolean = false;
	
	/**
	 * The text displayed above the input
	 */
	export let label: string = '';

	/**
	 * The options at the top of the input
	 * TODO: Make this extendable, not just overrideable
	 */
	export let toolbarOptions = [
		[{ 'font': [] }],
		[{ 'header': [1, 2, 3, false] }],
		["bold", "italic", "underline"],
		["blockquote", "link"],
		[{ list: "ordered" }, { list: "ordered" }],
		[{ 'indent': '-1'}, { 'indent': '+1' }],
		[{ 'color': [] }, { 'background': [] }],
		[{ align: [] }],
	];
	
	let editor: HTMLElement;

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

{#if label}
	<span class:font-bold={boldTitle}>{label}</span>
	{#if required}
		<RequiredStar/>
	{/if}
{/if}
<div bind:this={editor}/>

<style>
    @import '$lib/assets/styles/external/quill-1.3.6.css';
</style>
