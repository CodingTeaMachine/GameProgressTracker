<script lang="ts">
	import type { Item } from '$types/ui/Dropdown';
	
	// The items displayed in the dropdown
	export let items: Item[];
	
	let defaultSlotContent: HTMLElement | undefined;

	/**
	 * The dropdown only opens if:
	 * - The opening button has the same tabindex as the <ul> tag
	 * - The opening button has the role of 'button'
	 */
	$: {
		if(defaultSlotContent?.children && defaultSlotContent.children.length > 0){
			const openingButton = defaultSlotContent.children[0] as HTMLElement;
			
			if(!openingButton.hasAttribute('tabIndex')) {
				openingButton.tabIndex = 0;
			}
			
			if(!openingButton.hasAttribute('role')){
				openingButton.role = 'button';
			}
		}
	}
	
	function callItemAction(item: Item): void {
		if(typeof item === 'object') {
			console.log("calling");
			item.action();
		}
	}
</script>

<!--svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events-->
<div class="dai-dropdown" on:click|stopPropagation>
	<span bind:this={defaultSlotContent}>
		<slot>
			<div tabindex="0" role="button" class="btn m-1">Click</div>
		</slot>
	</span>
	
	<!--svelte-ignore a11y-no-noninteractive-tabindex-->
	<ul tabindex="0" class="dai-dropdown-content z-[1] dai-menu p-2 mt-2 shadow bg-surface-700 border border-surface-500 rounded-md w-max text-nowrap space-y-1">
		{#each items as item}
			<!--svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li on:click={() => callItemAction(item)} class="p-2 rounded-md hover:bg-surface-500">{typeof item === 'string' ? item : item.label}</li>
		{/each}
	</ul>
</div>
