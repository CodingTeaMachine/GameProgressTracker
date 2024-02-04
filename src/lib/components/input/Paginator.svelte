<script lang="ts">
	import { DEFAULT_ITEMS_PER_PAGE } from '$/lib/data/constants';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';

	export let perPage: number = DEFAULT_ITEMS_PER_PAGE;
	export let pickerAmounts: number[] = [25, 50, 100];
	export let totalItemCount: number = 0;
	export let page: number = 0;
	export let showFirstLastButtons: boolean = true;

	export let settings = {
		limit: perPage,
		amounts: pickerAmounts,
		size: totalItemCount,
		page
	} satisfies PaginationSettings;

	$: {
		page = settings.page;
		perPage = settings.limit;
	}

	type Events = {
		perPageChange: number;
		pageChange: number;
	};

	const dispatch = createEventDispatcher<Events>();
</script>

<Paginator
	bind:settings
	{showFirstLastButtons}
	showNumerals
	maxNumerals={1}
	justify="!flex-row-reverse justify-evenly"
	regionControl="btn-group !text-white !fill-white !bg-transparent !border !border-surface-500"
	buttonClasses="border-surface-500 bg-surface-700"
	on:amount={newAmount => dispatch('perPageChange', newAmount.detail)}
	on:page={newPage => dispatch('pageChange', newPage.detail)}
/>
