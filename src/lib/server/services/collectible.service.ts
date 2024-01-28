import logger from '$lib/helpers/logger';
import CollectibleServiceHelper from "$lib/helpers/serviceHelpers/collectibleServiceHelper";
import CollectibleRepository from "$lib/server/repositories/collectible.repository";
import type { Area } from "$types/domain/area";
import type { Collectible } from "$types/domain/collectible";
import type { CollectibleType } from "$types/domain/collectibleType";
import { LogService } from "$types/enums/LogService";
import type { Service } from "$types/serverTypes";

export default class CollectibleService implements Service {

	readonly _service = LogService.COLLECTIBLE_SERVICE;

	async save(collectibles: Collectible[], areas: Area[], collectibleTypes: CollectibleType[], game_id: number) {
		const collectiblesToSave = await new CollectibleServiceHelper().save(collectibles, areas, collectibleTypes, game_id);
		logger.info("Saving collectibles", {service: this._service, data: collectiblesToSave});
		await CollectibleRepository.createMany(collectiblesToSave);
	}

}
