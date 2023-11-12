import type { CollectibleType, ParentArea } from "$/lib/types/types";
import { get, writable } from 'svelte/store';

function useNewGameStore() {
	const collectibleTypes = writable<CollectibleType[]>([]);
	const areas = writable<ParentArea[]>([]);

	function getCollectibleTypeById(id: number): CollectibleType {
		return get(collectibleTypes).find(collectibleType => collectibleType.id === id) as CollectibleType;
	}

	return {
		collectibleTypes,
		areas,
		getCollectibleTypeById
	};
}

export const NewGameStore = useNewGameStore();
