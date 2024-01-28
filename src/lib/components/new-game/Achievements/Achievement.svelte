<script lang="ts">
	import FormTextInput from '$lib/components/input/FormTextInput.svelte';
	import CoverImageUploadWithPreview from '$lib/components/new-game/CoverImageUploadWithPreview.svelte';
	import Dropdown from '$lib/components/ui/Dropdown.svelte';
	import type { Achievement } from '$types/domain/achievement';
	import type { StorefrontDropdownItem } from '$types/domain/storefront';
	import { Save, Trash, Trophy, X } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	export let achievement: Achievement;
	export let storefronts: StorefrontDropdownItem[];
	let editingInProgress = false;
	
	type Events = {
		save: Achievement,
		delete: number
	}
	
	const disaptch = createEventDispatcher<Events>();
	
	function edit() {
		editingInProgress = true;
	}
	
	function save(){
		disaptch('save', achievement);
		cancel();
	}
	
	function cancel() {
		editingInProgress = false;
	}
	
	function remove() {
		disaptch('delete', achievement.localId);
		cancel();
	}
	
	function getStorefrontAchievementTypes(storefront: StorefrontDropdownItem): { label: string, action: () => void }[] {
		return storefront.AchievementGrades.map(grade => ({
			label: grade.label,
			action: () => {
				achievement.grades.set(storefront.id, grade);
				achievement = achievement;
				disaptch('save', achievement);
			}
		}));
	}
	
</script>


<div
	class="flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 duration-75 hover:bg-surface-700 py-3"
>
	<!--svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events-->
	<div
		class="flex w-full items-center gap-4 "
		class:h-20={editingInProgress}
		on:click={() => {
			editingInProgress || edit();
		}}
	>
		<div class="flex w-16 items-center justify-center z-10">
			{#if editingInProgress}
				<div class="h-12 w-12">
					<CoverImageUploadWithPreview
						hasText={false}
						on:upload={image => achievement.icon = image.detail}
					/>
				</div>
			{:else if achievement.icon}
				<img src={achievement.icon} alt="achievement icon" class="h-full rounded-md" />
			{:else}
				<Trophy/>
			{/if}
		</div>
		
		<div class="flex h-full w-full flex-col justify-evenly">
			{#if editingInProgress}
				<div class="mb-2">
					<FormTextInput
						name="Title"
						placeholder="Title..."
						value={achievement.title}
						on:input={newValue => achievement.title = newValue.detail}
					/>
				</div>
				
				<FormTextInput
					name="Description"
					placeholder="Description..."
					value={achievement.description}
					on:input={newValue => achievement.description = newValue.detail}
				/>
			{:else}
				<div class="text-lg font-bold">{achievement.title}</div>
				{#if achievement.description}
					<div class="opacity-50">{achievement.description}</div>
				{/if}
				<div class="flex flex-row flex-wrap gap-2">
					{#if storefronts.length > 0}
						{#each storefronts as storefront (storefront.id)}
							<Dropdown items={getStorefrontAchievementTypes(storefront)}>
								<div class="btn chip select-none border border-dashed border-secondary-500">
									{storefront.name} - {achievement.grades.get(storefront.id)?.label ?? "Not selected"}
								</div>
							</Dropdown>
						{/each}
					{:else}
						<div class="opacity-50 text-sm">No storefronts selected...</div>
					{/if}
					
				</div>
			{/if}
		</div>
	</div>
	<div class="flex flex-row gap-1">
		{#if editingInProgress}
			<button class="bg-initial btn-icon hover:text-success-500" on:click={save}>
				<Save />
			</button>
			<button class="bg-initial btn-icon hover:text-error-500" on:click={cancel}>
				<X />
			</button>
		{:else}
			<button class="bg-initial btn-icon hover:text-error-500" on:click={remove}>
				<Trash />
			</button>
		{/if}
	</div>
</div>
