<script lang="ts">
	import FormTextInput from '$lib/components/input/FormTextInput.svelte';
	import CoverImageUploadWithPreview from '$lib/components/new-game/CoverImageUploadWithPreview.svelte';
	import { currentAchievementLocalId } from '$lib/stores/new-game/newGameStore';
	import type { Achievement, AchievementGrade } from '$types/domain/achievement';
	import {  Save, X } from 'lucide-svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { get } from 'svelte/store';
	
	type Events = {
		save: Achievement
		cancel: void,
	}
	const dispatch = createEventDispatcher<Events>();
	
	onMount(() => {
		currentAchievementLocalId.update((n) => n + 1);
	});

	const achievement: Achievement = {
		localId: get(currentAchievementLocalId),
		title: '',
		description: '',
		grades: new Map<number, AchievementGrade | null>(),
	};
	
	function save() {
		dispatch('save', achievement);
	}
	
	function cancel() {
		dispatch('cancel');
	}
	
</script>

<div
	class="flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-3 duration-75 hover:bg-surface-700"
>
	<div class="flex w-full items-center gap-4 h-20">
		<div class="flex w-16 items-center justify-center">
			<div class="h-12 w-12">
				<CoverImageUploadWithPreview
					hasText={false}
					on:upload={image => achievement.icon = image.detail}
				/>
			</div>
		</div>
		
		<div class="flex h-full w-full flex-col justify-evenly">
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
		</div>
	</div>
	<div class="flex flex-row gap-1">
		<button type="button" class="bg-initial btn-icon hover:text-success-500" on:click={save}>
			<Save />
		</button>
		<button type="button" class="bg-initial btn-icon hover:text-error-500" on:click={cancel}>
			<X />
		</button>
	</div>
</div>
