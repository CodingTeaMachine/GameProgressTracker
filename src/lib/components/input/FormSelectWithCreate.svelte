<script lang="ts">
	import RequiredStar from '$lib/components/ui/RequiredStar.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import Select from 'svelte-select';

	/**
	 * The text displayed above the input
	 */
	export let label: string = '';

	/**
	 * Is the title bold
	 */
	export let boldTitle: boolean = false;

	/**
	 * The name of the input (used in forms)
	 */
	export let name: string = '';

	/**
	 * Items of the dropdown
	 */
	export let items: any[] = [];

	/**
	 * The key to use when getting a value out of a select option
	 */
	export let valueKey: string = 'value';

	/**
	 * The key to use when setting a label a select option
	 */
	export let valueLabel: string = 'label';

	/**
	 * If true, it's going to behave like a single select, but outputs an array
	 */
	export let fakeMultiselect: boolean = false;

	/**
	 * The selected value
	 */
	export let value: any = null;
	
	export let justValue: any = null;

	export let initialValue: any = null;

	export let fakeMultiselectValues: any[] = [];

	/**
	 * Wether to show the arrow at the and of the dropdown
	 */
	export let showArrow: boolean = true;
  
  	export let floatingConfig: object = {
      strategy: 'fixed',
	};

	/**
	 * Can the items be filtered
	 */
	export let searchable: boolean = true;

	/**
	 * The displayed text in the input when no value is selected
	 */
	export let placeholder: string = 'Please select...';

	/**
	 * Wether the input can be cleared with a single button
	 */
	export let clearable: boolean = true;

	/**
	 * Can multiple values be selected
	 */
	export let multiple: boolean = false;
 
	export let addNewText = 'Create new: ';
	
  	export  let groupBy: (item: typeof items[0]) => any = () => null;

	/**
	 * Is the input required
	 */
	export let required: boolean = false;

	const dispatch = createEventDispatcher<{change: any}>();

	let displayItems = [...items];
	let filterText = '';
	let localId = -1;

	onMount(() => {
		if (initialValue !== null) {
			value = displayItems.find(item => item[valueKey] === initialValue);
		}
	});
	
	function onChangeHandler(newValue: { detail: (typeof items)[0] }) {

		items = items.map((item) => {
			delete item.created;
			return item;
		});
		
		if (fakeMultiselect) {
			value = null;
			fakeMultiselectValues = [...fakeMultiselectValues, newValue.detail];
			dispatch('change', fakeMultiselectValues);
		} else {
			dispatch('change', value);
		}
	}
	
	function onFilterHandler(e: {detail: any[]}) {
		if (e.detail.length === 0 && filterText.length > 0) {
			const prev = items.filter((i) => !i.created);
			items = [...prev, {[valueKey]: localId--, [valueLabel]: filterText, created: true, }];
		}
	}

	function removeToken(index: number) {
		fakeMultiselectValues.splice(index, 1);
		fakeMultiselectValues = fakeMultiselectValues;
	}

	$: {
		if (!fakeMultiselect) {
			displayItems = items;
		} else {
			displayItems = items.filter(
				item =>
					fakeMultiselectValues.findIndex(
						(selectedValue: any) => selectedValue[valueKey] === item[valueKey]
					) === -1
			);
		}
	}
</script>

<!--svelte-ignore a11y-label-has-associated-control -->
<label class="label">
	
	{#if label}
		<span class:font-bold={boldTitle}>{label}</span>
		{#if required}
			<RequiredStar/>
		{/if}
	{/if}
	
	<Select
		bind:value
		bind:justValue
		bind:filterText
		class={label !== '' ? 'select-element !mt-1' : 'select-element'}
		itemId={valueKey}
		label={valueLabel}
		showChevron={showArrow}
		items={displayItems}
		{floatingConfig}
		{name}
		{searchable}
		{placeholder}
		{clearable}
		{multiple}
		{groupBy}
		on:change={onChangeHandler}
		on:filter={onFilterHandler}
	>
		<div slot="item" let:item>
			{item.created ? addNewText : ''}
			{item[valueLabel]}
		</div>
	</Select>
</label>

{#if fakeMultiselect && fakeMultiselectValues.length !== 0}
	<div class="flex flex-wrap justify-items-stretch gap-2">
		{#each fakeMultiselectValues as fakeMultiselectValue, index}
			<!--svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events-->
			<div
				class="chip select-none border border-dashed border-secondary-500 hover:border-error-500"
				on:click={() => removeToken(index)}
			>
				{fakeMultiselectValue[valueLabel]}
			</div>
		{/each}
	</div>
{/if}

<style lang="postcss">
	:global(.select-element) {
		--list-background: rgba(var(--color-surface-700) / 1);
		--item-hover-bg: rgba(var(--color-secondary-500) / 1);
		--multi-item-bg: rgba(var(--color-surface-700) / 1);
		--multi-item-clear-icon-color: rgba(var(--color-surface-50) / 1);

		--list-border: 1px solid rgba(var(--color-surface-500) / 1);
		--multi-item-outline: 1px dashed rgba(var(--color-secondary-500) / 1);

		--list-empty-padding: 10px;

		@apply !border-surface-500 !bg-surface-700;
	}
</style>
