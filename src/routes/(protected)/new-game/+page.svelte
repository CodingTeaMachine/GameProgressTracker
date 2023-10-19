<script lang="ts">
	import FormCheckbox from '$/lib/components/input/FormCheckbox.svelte';
	import FormInput from '$/lib/components/input/FormTextInput.svelte';
	import FormSelect from '$/lib/components/input/FormSelect.svelte';
	import FormTextarea from '$/lib/components/input/FormTextarea.svelte';
	import Card from '$lib/components/new-game/Card.svelte';
	import CoverImageUploadWithPreview from '$lib/components/new-game/CoverImageUploadWithPreview.svelte';
	import FormDatepicker from '$/lib/components/input/FormDatepicker.svelte';

	let uploadedImages: FileList | undefined = undefined;
	let isDLC = false;

	const parentTitles = [
		{
			label: "Assassin's Creed Mirage",
			value: 1
		},
		{
			label: 'Prince of Persia The Sands of Time',
			value: 2
		}
	];

	const franchisees = [
		{
			label: "Assassin's Creed",
			value: 1
		},
		{
			label: 'Prince of Persia',
			value: 2
		}
	];

	const genres = [
		{
			label: 'Action',
			value: 1
		},
		{
			label: 'RPG',
			value: 2
		},
		{
			label: 'MMO',
			value: 3
		},
		{
			label: 'Adventure',
			value: 4
		},
		{
			label: 'Puzzle',
			value: 5
		},
		{
			label: 'Fighter',
			value: 6
		}
	];

	const publishers = [
		{
			label: 'Activision',
			value: 1
		},
		{
			label: 'Ubisoft',
			value: 2
		},
		{
			label: 'Valve',
			value: 3
		},
		{
			label: 'Blizard',
			value: 4
		}
	];

	const developers = [
		{
			label: 'Activision',
			value: 1
		},
		{
			label: 'Ubisoft',
			value: 2
		},
		{
			label: 'Valve',
			value: 3
		},
		{
			label: 'Blizard',
			value: 4
		}
	];

	const platforms = [
		{
			label: 'PC',
			value: 1
		},
		{
			label: 'Playstation 3',
			value: 2
		},
		{
			label: 'Xbox One',
			value: 3
		},
		{
			label: 'Nintendo Wii',
			value: 4
		}
	];

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

	let selectedGenres: any[] = [];
	let selectedDevelopers: any[] = [];
	let selectedPublishers: any[] = [];
	let selectedPlatforms: any[] = [];
	let selectedStorefronts: any[] = [];

	let releaseDate: Date | null = null;
</script>

<form class="mx-4 mb-10 flex h-[150%] flex-col gap-4 pr-4">
	<section class="card-row row-span-2">
		<Card title="Cover Image">
			<CoverImageUploadWithPreview bind:uploadedImages />
		</Card>
		<Card title="General">
			<div class="flex flex-col gap-2">
				<FormInput label="Title" name="title" boldTitle />
				<FormTextarea label="Description" name="description" boldTitle />
				<FormSelect label="Franchise" name="franchise" boldTitle items={franchisees} />
				<FormCheckbox label="Is DLC?" name="isDLC" bind:checked={isDLC} />
				{#if isDLC}
					<FormSelect label="Parent title" name="parent" boldTitle items={parentTitles} />
				{/if}
			</div>
		</Card>
		<Card title="Miscellaneous">
			<FormSelect
				bind:fakeMultiselectValues={selectedGenres}
				items={genres}
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
				fakeMultiselect
				boldTitle
			/>
		</Card>
		<Card title="Developers">
			<FormSelect
				bind:fakeMultiselectValues={selectedDevelopers}
				items={developers}
				label="Developers"
				name="developers"
				fakeMultiselect
				boldTitle
			/>
			<FormSelect
				bind:fakeMultiselectValues={selectedPlatforms}
				items={platforms}
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
		</Card>
	</section>

	<section class="card-row">
		<Card title="Areas / Levels" double />
		<Card title="Achievements" double />
	</section>

	<section class="card-row">
		<Card title="Collectible Types" double />
		<Card title="Collectibles" double />
	</section>
</form>

<style lang="postcss">
	.card-row {
		@apply grid h-full grid-cols-4 gap-4;
	}
</style>
