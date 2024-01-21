import logger from "$lib/helpers/logger";
import CollectibleTypeRepository from "$lib/server/repositories/collectibleType.repository";
import type { CollectibleType } from "$types/domain/collectibleType";
import { LogService } from "$types/enums/LogService";
import type { Store } from "$types/serverTypes";

export default class CachedCollectibleTypeStore implements Store<number>{
	readonly _service = LogService.CACHED_COLLECTIBLE_TYPE_STORE;

	private collectibleTypes: CollectibleType[];
	private collectibleTypeCache: Map<number, number> = new Map();
	private readonly gameId: number;

	constructor(collectibleTypes: CollectibleType[], gameId: number) {
		this.collectibleTypes = collectibleTypes;
		this.gameId = gameId;
	}

	async get(collectTypeLocalId: number): Promise<number> {
		if(this.collectibleTypeCache.has(collectTypeLocalId)) {
			logger.info("Hit cache with collectible_type_id: " + collectTypeLocalId, {service: this._service});
			return this.collectibleTypeCache.get(collectTypeLocalId) as number;
		}
		logger.warn("Missed cache with collectible_type_id:" + collectTypeLocalId, {service: this._service});


		const selectedCollectibleType = this.collectibleTypes.find(collectibleType => collectibleType.id === collectTypeLocalId) as CollectibleType;
		const collectibleTypeFromDb = await new CollectibleTypeRepository().findByTitleAndGame(selectedCollectibleType.title, this.gameId);

		this.collectibleTypeCache.set(collectTypeLocalId, collectibleTypeFromDb.id);
		logger.info("Saved collectible type to cache with id: " + collectTypeLocalId, {
			service: this._service, ata: {collectTypeLocalId, cached: collectibleTypeFromDb.id}});


		return collectibleTypeFromDb.id;
	}
}
