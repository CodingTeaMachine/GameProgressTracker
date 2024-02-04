<script lang="ts">
	import FormTextInput from '$lib/components/input/FormTextInput.svelte';
	import { createEventDispatcher } from 'svelte';

	export let searchText = '';

	const DEBOUNCE_TIME = 1000;

	type Events = {
		searchTextChange: string
	}

	const dispatch = createEventDispatcher<Events>();

	let searchTimeout: ReturnType<typeof setTimeout>;

	$: {
		[searchText];
		clearTimeout(searchTimeout);

		searchTimeout = setTimeout(() => dispatch('searchTextChange', searchText ?? ''), DEBOUNCE_TIME);
	}
</script>

<div class="ml-auto mr-0 w-1/5">
	<FormTextInput bind:value={searchText} placeholder="Search..." name="search" />
</div>
