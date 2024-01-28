<script lang="ts">
	import Card from '$lib/components/new-game/Card.svelte';
	import { NewGameStore } from '$lib/stores/new-game/newGameStore';
	import type { StorefrontDropdownItem } from '$types/domain/storefront';
	import { Plus } from 'lucide-svelte';
	import AddAchievement from '$lib/components/new-game/Achievements/AddAchievement.svelte';
	import Achievement from './Achievement.svelte';

	import type { Achievement as AchievementType } from '$types/domain/achievement';

	export let storefronts: StorefrontDropdownItem[];
	
	$: filteredStorefronts = storefronts.filter(storefront => storefront.has_achievements);
	
	let editingInProgress = false;
	let isAddAchievement = false;
	
	const achievements = NewGameStore.achievements;
	
	function save(saveAchievementEvent: CustomEvent<AchievementType>) {
		achievements.update(achievements => [...achievements, saveAchievementEvent.detail]);
		cancelAdd();
	}
	function cancelAdd() {
		isAddAchievement = false;
	}
	
	function saveEdit(saveAchievementEvent: CustomEvent<AchievementType>) {
		const achievementToUpdate = saveAchievementEvent.detail;
		
		achievements.update(achievements => achievements.map(achievement =>
			achievement.localId === achievementToUpdate.localId
				? achievementToUpdate
				: achievement
		));
	}
	
	function remove(removeAchievementEvent: CustomEvent<number>) {
		achievements.update(achievements => achievements.filter(achievement => achievement.localId !== removeAchievementEvent.detail));
	}
</script>

<Card title="Achievements" double>
	<button
		class="variant-filled-secondary btn btn-sm mb-4 mt-2"
		on:click={() => (isAddAchievement = true)}
		disabled={editingInProgress}
		type="button"
	>
		<span><Plus /></span>
		<span>Add achievement</span>
	</button>

	{#if isAddAchievement}
		<AddAchievement on:save={save} on:cancel={cancelAdd} />
	{/if}

	{#each $achievements as achievement (achievement.localId)}
		<Achievement storefronts={filteredStorefronts} {achievement} on:save={saveEdit} on:delete={remove}/>
	{/each}
</Card>
