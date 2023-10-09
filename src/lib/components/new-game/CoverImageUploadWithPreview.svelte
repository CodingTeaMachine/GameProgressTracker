<script lang="ts">
	import CoverImageUpload from '$lib/components/new-game/CoverImageUpload.svelte';
	import { Trash } from 'lucide-svelte';
	import { Modals } from '$lib/helpers/modals.js';

	export let uploadedImages: FileList | undefined;

	let coverImageUploaded = false;
	let imagePreview: HTMLImageElement;

	let coverImageWidth = 0;

	function onCoverImageUpload(uploadedImage: CustomEvent<Blob>) {
		coverImageUploaded = true;

		const reader = new FileReader();
		reader.addEventListener('load', function () {
			if (typeof reader.result === 'string') {
				imagePreview.setAttribute('src', reader.result);
				
				// This must have a better solution
				// When we set the imagePreview src, sometimes it takes about 10ms to actually load it
				// So if we set before that, the imagePreview might not have a width yet
				setTimeout(() => {
					coverImageWidth = imagePreview.width;
				}, 10);
			} else {
				console.log('ez lett');
				coverImageUploaded = false;
				coverImageWidth = 0;
			}
		});

		reader.readAsDataURL(uploadedImage.detail);
	}

	function removeCoverImage() {
		Modals.confirm('Confirm', 'Are you sure you want to delete the cover image?').then(() => {
			uploadedImages = undefined;
			coverImageUploaded = false;
		});
	}
</script>

{#if !coverImageUploaded}
	<CoverImageUpload bind:uploadedImages on:upload={onCoverImageUpload} />
{:else}
	<div class="group relative flex h-full cursor-pointer items-center justify-center">
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<img bind:this={imagePreview} src="" alt="cover image" class="h-full rounded-md" />
		<div
			aria-hidden="true"
			class="absolute top-0 hidden h-full rounded-md bg-surface-900/90 group-hover:block"
			style="width: {coverImageWidth + 'px'}"
			on:click={removeCoverImage}
		>
			<div class="flex h-full w-full items-center justify-center text-error-500">
				<Trash />
			</div>
		</div>
	</div>
{/if}
