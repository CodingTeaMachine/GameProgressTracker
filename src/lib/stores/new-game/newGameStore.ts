import type { Area } from '$types/domain/area';
import type {  CollectibleWithAreaId } from "$types/domain/collectible";
import type { CollectibleType } from '$types/domain/collectibleType';
import { get, writable } from 'svelte/store';

function useNewGameStore() {
	const collectibleTypes = writable<CollectibleType[]>([]);
	const areas = writable<Area[]>([]);
	const collectibles = writable<CollectibleWithAreaId[]>([]);

	function getCollectibleTypeById(id: number): CollectibleType {
		return get(collectibleTypes).find(collectibleType => collectibleType.id === id) as CollectibleType;
	}

	return {
		collectibleTypes,
		areas,
		collectibles,
		getCollectibleTypeById
	};
}

export const NewGameStore = useNewGameStore();
