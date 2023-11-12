<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { Camera } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	export let hasText: boolean = true;

	interface Events {
		upload: Blob;
	}

	const dispatch = createEventDispatcher<Events>();

	export let uploadedImages: FileList | undefined;

	function onCoverImageUpload() {
		if (uploadedImages !== undefined) {
			dispatch('upload', uploadedImages[0]);
		}
	}
</script>

<FileDropzone
	bind:files={uploadedImages}
	name="coverImage"
	class="mx-auto h-full !p-0"
	accept=".png, .jpg, .jpeg"
	on:change={onCoverImageUpload}
>
	<svelte:fragment slot="message">
		<div class="flex items-center gap-2 align-middle">
			<Camera />
			{#if hasText}
				<span>Cover image</span>
			{/if}
		</div>
	</svelte:fragment>
</FileDropzone>
