<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import CoverImageUploadWithPreview from '$lib/components/new-game/CoverImageUploadWithPreview.svelte';
	import FormCheckbox from '$/lib/components/input/FormCheckbox.svelte';
	import FormDatepicker from '$/lib/components/input/FormDatepicker.svelte';
	import FormSelect from '$/lib/components/input/FormSelect.svelte';
	import FormTextarea from '$/lib/components/input/FormTextarea.svelte';
	import FormInput from '$/lib/components/input/FormTextInput.svelte';
	import FormSelectWithCreate from '$lib/components/input/FormSelectWithCreate.svelte';
	import Card from '$lib/components/new-game/Card.svelte';
	import AreasCard from '$/lib/components/new-game/AreasAndLevels/AreasCard.svelte';
	import CollectibleTypesCard from '$/lib/components/new-game/CollectibleTypes/CollectibleTypesCard.svelte';
	import CollectiblesCard from '$/lib/components/new-game/Collectibles/CollectiblesCard.svelte';

	import { NewGameStore } from '$lib/stores/new-game/newGameStore';

	import type { GeneralDropdownData } from '$/lib/types/types';
	import type { ActionData, PageData } from './$types';
	import { Pages } from '$types/enums/pages';

	export let data: PageData;
	export let form: ActionData;

	const { form: newGameForm, errors, enhance } = superForm(data.form, { dataType: 'json' });
	const toastStore = getToastStore();

	$: {
		if (form?.errorMessage) {
			openErrorToast(form.errorMessage);
		}
	}

	const errorFieldsWithToast: (keyof typeof $errors)[] = ['coverImage'];

	$: {
		//@ts-expect-error Idk man...
		errorFieldsWithToast.forEach(field => $errors[field] !== undefined && openErrorToast($errors[field]));
	}

	function openErrorToast(message: string) {
		toastStore.trigger({ message, timeout: 3000, background: 'variant-filled-error' });
	}

	const { publishers, developers, genres, platforms, storefronts } = data;

	//The file upload thing is wierd, should look into refactoring
	let uploadedImages: FileList | undefined = undefined;

	const parentTitles: GeneralDropdownData[] = [];
	const franchisees: GeneralDropdownData[] = [];
</script>

<SuperDebug data={$newGameForm}/>

<form class="mx-4 mb-10 grid grid-cols-4 gap-4 pr-4" method="POST" use:enhance>
	<!--First row-->
	<Card title="Cover Image">
		<CoverImageUploadWithPreview
			bind:uploadedImages
			on:upload={event => ($newGameForm.coverImage = event.detail)}
			on:delete={() => ($newGameForm.coverImage = undefined)}
		/>
	</Card>

	<Card title="General">
		<div class="flex flex-col gap-2">
			<FormInput bind:value={$newGameForm.title} errors={$errors.title} label="Title" name="title" boldTitle />
			<FormTextarea
				bind:value={$newGameForm.description}
				errors={$errors.description}
				label="Description"
				name="description"
				rows={3}
				boldTitle
			/>
			<FormSelectWithCreate
				bind:value={$newGameForm.franchise}
				items={franchisees}
				addNewText="Create new franchise: "
				label="Franchise"
				name="franchise"
				boldTitle
			/>
			<FormCheckbox bind:checked={$newGameForm.isDLC} label="Is DLC?" name="isDLC" />

			{#if $newGameForm.isDLC}
				<FormSelect
					bind:value={$newGameForm.parentTitle}
					items={parentTitles}
					label="Parent title"
					name="parentTitle"
					boldTitle
				/>
			{/if}
		</div>
	</Card>

	<Card title="Developers">
		<div class="flex flex-col gap-2">
			<FormSelect
				bind:fakeMultiselectValues={$newGameForm.developers}
				items={developers}
				valueKey="id"
				label="Developers"
				name="developers"
				fakeMultiselect
				boldTitle
			/>

			<FormDatepicker bind:value={$newGameForm.releaseDate} label="Release Date" name="releaseDate" boldTitle />

			<FormSelect
				bind:fakeMultiselectValues={$newGameForm.publishers}
				items={publishers}
				label="Publishers"
				name="publishers"
				valueKey="id"
				fakeMultiselect
				boldTitle
			/>
		</div>
	</Card>

	<Card title="Miscellaneous">
		<div class="flex flex-col gap-2">
			<FormSelect
				bind:fakeMultiselectValues={$newGameForm.genres}
				items={genres}
				valueKey="id"
				label="Genres"
				name="genres"
				boldTitle
				fakeMultiselect
			/>

			<FormSelect
				bind:fakeMultiselectValues={$newGameForm.platforms}
				items={platforms}
				valueKey="id"
				valueLabel="name"
				label="Platforms"
				name="platforms"
				fakeMultiselect
				boldTitle
			/>
			<FormSelect
				bind:fakeMultiselectValues={$newGameForm.storefronts}
				items={storefronts}
				valueKey="id"
				valueLabel="name"
				label="Storefronts"
				name="storefronts"
				groupBy={storefront => storefront.Type.name}
				fakeMultiselect
				boldTitle
			/>
		</div>
	</Card>

	<!--Middle row-->
	<AreasCard />
	<CollectibleTypesCard />

	<!--Bottom Row-->
	<Card title="Achievements" double />
	<CollectiblesCard />

	<!--<input type="hidden" name="areas" value={NewGameStore.areas} />-->
	<!--<input type="hidden" name="collectibleTypes" value={NewGameStore.collectibleTypes} />-->
	<!--<input type="hidden" name="collectibles" value={NewGameStore.collectibles} />-->

	<div class="flex flex-row justify-end gap-4">
		<a href={Pages.HOME} class="variant-filled-error btn w-40">Cancel</a>
		<button type="submit" class="variant-filled-secondary btn w-40"> Save New Game </button>
	</div>
</form>

<style lang="postcss">
	.card-row {
		@apply grid h-[29rem] grid-cols-4 gap-4;
	}
</style>
