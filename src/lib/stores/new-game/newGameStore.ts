import type { Achievement } from '$types/domain/achievement';
import type { Area } from '$types/domain/area';
import type { Collectible } from '$types/domain/collectible';
import type { CollectibleType } from '$types/domain/collectibleType';
import { get, type Writable, writable } from 'svelte/store';

function useNewGameStore() {
	const collectibleTypes = writable<CollectibleType[]>([]);
	const areas = writable<Area[]>([]);
	const collectibles = writable<Collectible[]>([]);
	const achievements = writable<Achievement[]>([]);

	function getCollectibleTypeById(id: number): CollectibleType {
		return get(collectibleTypes).find(collectibleType => collectibleType.id === id) as CollectibleType;
	}

	return {
		collectibleTypes,
		areas,
		collectibles,
		achievements,
		getCollectibleTypeById
	};
}

export const NewGameStore = useNewGameStore();
export const currentAchievementLocalId: Writable<number> = writable(0);
