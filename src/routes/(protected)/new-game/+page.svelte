<script lang="ts" xmlns:svelte="http://www.w3.org/1999/html">
	import NewGameService from '$lib/client/services/NewGame.service';
	import FormAsyncSelect from '$lib/components/input/FormAsyncSelect.svelte';
	import AchievementsCard from '$lib/components/new-game/Achievements/AchievementsCard.svelte';
	import RequiredStar from '$lib/components/ui/RequiredStar.svelte';
	import { goto } from '$app/navigation';
	import DescriptionCard from '$lib/components/new-game/DescriptionCard.svelte';
	import { SuperValidateFormMessage } from '$types/enums/errors';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';

	import { openErrorToast, openSuccessToastWithTimer } from '$lib/helpers/toasts';

	import CoverImageUploadWithPreview from '$lib/components/new-game/CoverImageUploadWithPreview.svelte';
	import FormCheckbox from '$/lib/components/input/FormCheckbox.svelte';
	import FormDatepicker from '$/lib/components/input/FormDatepicker.svelte';
	import FormSelect from '$/lib/components/input/FormSelect.svelte';
	import FormInput from '$/lib/components/input/FormTextInput.svelte';
	import FormSelectWithCreate from '$lib/components/input/FormSelectWithCreate.svelte';
	import Card from '$lib/components/new-game/Card.svelte';
	import AreasCard from '$/lib/components/new-game/AreasAndLevels/AreasCard.svelte';
	import CollectibleTypesCard from '$/lib/components/new-game/CollectibleTypes/CollectibleTypesCard.svelte';
	import CollectiblesCard from '$/lib/components/new-game/Collectibles/CollectiblesCard.svelte';

	import { NewGameStore } from '$lib/stores/new-game/newGameStore';

	import type { PageData } from './$types';
	import { Pages } from '$types/enums/pages';

	export let data: PageData;
	const toastStore = getToastStore();

	// TODO: There is no error here, just phpstorm being dumb this update again...
	// @ts-expect-error
	const { form: newGameForm, enhance } = superForm(data.form, {
		dataType: 'json',
		taintedMessage: null,
		onUpdated({ form: newGameForm }) {
			if (newGameForm.message === SuperValidateFormMessage.SUCCESS) {
				openSuccessToastWithTimer(toastStore, 'Successfully created new game', 5000).then(() => {
					NewGameStore.areas.set([]);
					NewGameStore.collectibleTypes.set([]);
					NewGameStore.collectibles.set([]);
					NewGameStore.achievements.set([]);
					goto(Pages.HOME);
				});
			} else if(newGameForm.errors) {
				for (const error of Object.values(newGameForm.errors)) {
					openErrorToast(toastStore, error, 10000);
				}
			}
		}
	});
	
	const { publishers, developers, genres, platforms, storefronts, franchises } = data;
	

	onMount(() => {
		NewGameStore.areas.subscribe(areas =>
			newGameForm.update(form => ({ ...form, areas }), { taint: false })
		);
		
		NewGameStore.collectibleTypes.subscribe(collectibleTypes =>
			newGameForm.update(form => ({ ...form, collectibleTypes }), { taint: false })
		);
		
		NewGameStore.collectibles.subscribe(collectibles =>
			newGameForm.update(form => ({ ...form, collectibles }), { taint: false })
		);
		
		NewGameStore.achievements.subscribe(achievements =>
			newGameForm.update(form => ({ ...form, achievements }), { taint: false })
		);
	});
</script>

<!--svelte-ignore a11y-no-noninteractive-element-interactions-->
<form class="mx-4 mb-10 pr-4" method="POST" use:enhance on:keydown={event => event.key !== 'Enter'}>
	<div class="grid grid-cols-4 gap-4">
		<!--1st row-->
		<Card>
			<svelte:fragment slot="title">
				Cover Image <RequiredStar/>
			</svelte:fragment>
			
			<CoverImageUploadWithPreview
				on:upload={event => newGameForm.update(form => ({ ...form, coverImage: event.detail }))}
				on:delete={() => newGameForm.update(form => ({ ...form, coverImage: undefined }))}
			/>
		</Card>

		<Card title="General">
			<div class="flex flex-col gap-2">
				<FormInput bind:value={$newGameForm.title} label="Title" name="title" boldTitle required/>
				<FormSelectWithCreate
					bind:value={$newGameForm.franchise}
					items={franchises}
					addNewText="Create new franchise: "
					label="Franchise"
					name="franchise"
					valueKey="id"
					valueLabel="title"
					boldTitle
				/>
				<FormCheckbox bind:checked={$newGameForm.isDLC} label="Is DLC?" name="isDLC" />

				{#if $newGameForm.isDLC}
					<FormAsyncSelect
						bind:value={$newGameForm.parentTitle}
						loader={NewGameService.getParentTitlesWithSearch}
						label="Parent title"
						name="parentTitle"
						valueKey="id"
						valueLabel="title"
						boldTitle
					/>
				{/if}

				<FormDatepicker
					bind:value={$newGameForm.releaseDate}
					label="Release Date"
					name="releaseDate"
					boldTitle
				/>
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

		<!--2nd row-->
		<DescriptionCard bind:value={$newGameForm.description} />

		<!--3rd row-->
		<AreasCard />
		<CollectibleTypesCard />

		<!--4th Row-->
		<CollectiblesCard />
		<AchievementsCard storefronts={$newGameForm.storefronts}/>
	</div>

	<div class="w-100 mt-3 flex flex-row justify-end gap-4">
		<a href={Pages.HOME} class="variant-filled-error btn w-40">Cancel</a>
		<button type="submit" class="variant-filled-secondary btn w-40"> Save New Game</button>
	</div>
</form>
