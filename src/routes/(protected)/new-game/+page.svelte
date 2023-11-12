<script lang="ts">
	import FormCheckbox from '$/lib/components/input/FormCheckbox.svelte';
	import FormInput from '$/lib/components/input/FormTextInput.svelte';
	import FormSelect from '$/lib/components/input/FormSelect.svelte';
	import FormTextarea from '$/lib/components/input/FormTextarea.svelte';
	import Card from '$lib/components/new-game/Card.svelte';
	import CoverImageUploadWithPreview from '$lib/components/new-game/CoverImageUploadWithPreview.svelte';
	import FormDatepicker from '$/lib/components/input/FormDatepicker.svelte';
	import AreasAndLevelsCard from '$/lib/components/new-game/AreasAndLevels/AreasAndLevelsCard.svelte';
	import CollectibleTypeCard from '$/lib/components/new-game/CollectibleTypes/CollectibleTypeCard.svelte';
	import type { GeneralDropdownData } from '$/lib/types/types';
	import CollectiblesCard from '$/lib/components/new-game/Collectibles/CollectiblesCard.svelte';
    import type { PageData } from './$types';
  	export let data: PageData;
  
	let uploadedImages: FileList | undefined = undefined;
	let isDLC = false;
    let releaseDate: Date | null = null;
    
    const publishers = data.publishers;
    const developers = data.developers;
    const genres = data.genres;
	const platforms = data.platforms;

    const parentTitles: GeneralDropdownData[] = [];
	const franchisees: GeneralDropdownData[] = [];
	

	const storefronts = [
		{
			label: 'Steam',
			value: 1
		},
		{
			label: 'Playstation Now',
			value: 2
		},
		{
			label: 'Xbox Store',
			value: 3
		},
		{
			label: 'Nintendo Store',
			value: 4
		}
	];

	let selectedGenres: GeneralDropdownData[] = [];
	let selectedDevelopers: GeneralDropdownData[] = [];
	let selectedPublishers: GeneralDropdownData[] = [];
	let selectedPlatforms: GeneralDropdownData[] = [];
	let selectedStorefronts: GeneralDropdownData[] = [];

</script>

<form class="mx-4 mb-10 grid grid-rows-4 gap-4 pr-4">
	<section class="card-row">
		<Card title="Cover Image">
			<CoverImageUploadWithPreview bind:uploadedImages />
		</Card>
		<Card title="General">
			<div class="flex flex-col gap-2">
				<FormInput label="Title" name="title" boldTitle />
				<FormTextarea label="Description" name="description" rows={3} boldTitle />
				<FormSelect label="Franchise" name="franchise" boldTitle items={franchisees} />
				<FormCheckbox label="Is DLC?" name="isDLC" bind:checked={isDLC} />
				{#if isDLC}
					<FormSelect label="Parent title" name="parent" boldTitle items={parentTitles} />
				{/if}
			</div>
		</Card>
		<Card title="Miscellaneous">
			<div class="flex flex-col gap-2">
				<FormSelect
					bind:fakeMultiselectValues={selectedGenres}
					items={genres}
					valueKey="id"
					label="Genres"
					name="genres"
					boldTitle
					fakeMultiselect
				/>

				<FormDatepicker bind:value={releaseDate} label="Release Date" boldTitle />

				<FormSelect
					bind:fakeMultiselectValues={selectedPublishers}
					items={publishers}
					label="Publishers"
					name="publishers"
					valueKey="id"
					fakeMultiselect
					boldTitle
				/>
			</div>
		</Card>
		<Card title="Developers">
			<div class="flex flex-col gap-2">
				<FormSelect
					bind:fakeMultiselectValues={selectedDevelopers}
					items={developers}
					valueKey="id"
					label="Developers"
					name="developers"
					fakeMultiselect
					boldTitle
				/>
				<FormSelect
					bind:fakeMultiselectValues={selectedPlatforms}
					items={platforms}
					valueKey="id"
					valueLabel="name"
					label="Platforms"
					name="platforms"
					fakeMultiselect
					boldTitle
				/>
				<FormSelect
					bind:fakeMultiselectValues={selectedStorefronts}
					items={storefronts}
					label="Storefronts"
					name="storefronts"
					fakeMultiselect
					boldTitle
				/>
			</div>
		</Card>
	</section>

	<section class="card-row">
		<AreasAndLevelsCard />
		<CollectibleTypeCard />
	</section>

	<section class="card-row row-span-2 !h-full">
		<Card title="Achievements" double />
		<CollectiblesCard />
	</section>
</form>

<style lang="postcss">
	.card-row {
		@apply grid h-96 grid-cols-4 gap-4;
	}
</style>
