<script lang="ts">
	import { goto } from "$app/navigation";
	import { SuperValidateFormMessage } from "$types/enums/errors";
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from "svelte";
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import { openErrorToast, openSuccessToastWithTimer } from "$lib/helpers/toasts";
	
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

	const toastStore = getToastStore();
	
	const { form: newGameForm, errors, enhance} = superForm(
		data.form,
		{
			dataType: 'json',
			taintedMessage: null,
			onUpdated({form: newGameForm}) {
				if(newGameForm.message === SuperValidateFormMessage.SUCCESS) {
					openSuccessToastWithTimer(toastStore, "Successfully created new game", 5000)
						.then(() => {
							NewGameStore.areas.set([]);
							NewGameStore.collectibleTypes.set([]);
							NewGameStore.collectibles.set([]);
							goto(Pages.HOME);
						});
				}
			}
		}
	);
	
	$: {
		if (form?.errorMessage) {
			openErrorToast(toastStore, form.errorMessage);
		}
	}

	const errorFieldsWithToast: (keyof typeof $errors)[] = ['coverImage'];

	$: {
		errorFieldsWithToast.forEach(field => $errors[field] !== undefined && openErrorToast(toastStore, $errors[field] as string));
	}

	const { publishers, developers, genres, platforms, storefronts } = data;

	//TODO: load these from the server
	const parentTitles: GeneralDropdownData[] = [];
	const franchisees: GeneralDropdownData[] = [];
	
	onMount(() => {
		//@ts-expect-error The areas in the form are not typed as Area[]
		NewGameStore.areas.subscribe(areas => newGameForm.update(form => ({...form, areas}), {taint: false}));
		//@ts-expect-error The collectibleTypes in the form are not typed as CollectibleType[]
		NewGameStore.collectibleTypes.subscribe(collectibleTypes => newGameForm.update(form => ({...form, collectibleTypes}), {taint: false}));
	});
</script>

<SuperDebug data={$newGameForm}/>

<form class="mx-4 mb-10 pr-4" method="POST" use:enhance>
	<div class="grid grid-cols-4 gap-4">
		<!--First row-->
		<Card title="Cover Image">
			<CoverImageUploadWithPreview
				on:upload={event => newGameForm.update(form => ({...form, coverImage: event.detail}))}
				on:delete={() => newGameForm.update(form => ({...form, coverImage: undefined}))}
			/>
		</Card>

		<Card title="General">
			<div class="flex flex-col gap-2">
				<FormInput
					bind:value={$newGameForm.title}
					errors={$errors.title}
					label="Title"
					name="title"
					boldTitle
				/>
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

				<FormDatepicker
					bind:value={$newGameForm.releaseDate}
					label="Release Date"
					name="releaseDate"
					boldTitle
				/>

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
		<!--<input type="hidden" name="collectibleTypes" value={NewGameStore.collectibleTypes} />-->
		<!--<input type="hidden" name="collectibles" value={NewGameStore.collectibles} />-->
	</div>
	
	<div class="w-100 flex flex-row justify-end gap-4 mt-3">
		<a href={Pages.HOME} class="variant-filled-error btn w-40">Cancel</a>
		<button type="submit" class="variant-filled-secondary btn w-40"> Save New Game</button>
	</div>
</form>
