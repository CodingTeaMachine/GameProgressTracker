import CachedAreaStore from "$lib/server/cachedStores/CachedAreaStore";
import CachedCollectibleTypeStore from "$lib/server/cachedStores/CachedCollectibleTypeStore";
import CollectibleToSaveFactory from "$lib/server/factories/CollectibleToSaveFactory";
import type { Area } from "$types/domain/area";
import type { CollectibleToSave, Collectible } from "$types/domain/collectible";
import type { CollectibleType } from "$types/domain/collectibleType";
import { LogService } from "$types/enums/LogService";
import type { Loggable } from "$types/serverTypes";

export default class CollectibleServiceHelper implements Loggable{
	readonly _service = LogService.COLLECTIBLE_SERVICE_HELPER;

	async save(collectibles: Collectible[], areas: Area[], collectibleTypes: CollectibleType[], gameId: number): Promise<CollectibleToSave[]> {
		const collectiblesToSave: CollectibleToSave[] = [];

		const collectibleToSaveFactory = new CollectibleToSaveFactory(
			new CachedCollectibleTypeStore(collectibleTypes, gameId),
			new CachedAreaStore(areas, gameId)
		);

		for (const collectible of collectibles) {
			collectiblesToSave.push(await collectibleToSaveFactory.create(gameId, collectible));
		}

		return collectiblesToSave;
	}

}
