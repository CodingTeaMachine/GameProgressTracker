import logger from "$lib/helpers/logger";
import CollectibleTypeToSaveFactory from "$lib/server/factories/CollectibleTypeToSaveFactory";
import type { CollectibleType, CollectibleTypeToSave } from "$types/domain/collectibleType";
import { LogService } from "$types/enums/LogService";
import CollectibleTypeRepository from "$lib/server/repositories/collectibleType.repository";
import type { Service } from "$types/serverTypes";

export default class CollectibleTypeService implements Service{
	readonly _service = LogService.COLLECTIBLE_TYPE_SERVICE;

	async save(collectibleTypes: CollectibleType[], gameId: number) {

		const collectibleTypesToSave: CollectibleTypeToSave[] = [];

		for (const colType of collectibleTypes) {
			collectibleTypesToSave.push(await CollectibleTypeToSaveFactory.create(colType, gameId));
		}

		logger.info("Saving collectible type", {service: this._service, data: collectibleTypesToSave});
		await new CollectibleTypeRepository().createMany(collectibleTypesToSave);
	}
}
