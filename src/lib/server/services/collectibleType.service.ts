import { COLLECTIBLE_TYPE_IMAGE_PATH } from "$lib/data/constants";
import logger from "$lib/helpers/logger";
import { getSavedImageName } from "$lib/server/imageHandler";
import type { CollectibleType, CollectibleTypeToSave } from "$types/domain/collectibleType";
import { LogService } from "$types/enums/LogService";
import CollectibleTypeRepository from "$lib/server/repositories/collectibleType.repository";

export const saveCollectibleTypes = async (collectibleTypes: CollectibleType[], game_id: number) => {
	const collectibleTypesToSave: CollectibleTypeToSave[] = collectibleTypes.map(collectibleType => ({
		title: collectibleType.title,
		description: collectibleType.description,
		image: collectibleType.imageSrc,
		game_id
	}));

	for (const collectibleType of collectibleTypesToSave) {
		if(collectibleType.image) {
			collectibleType.image = await getSavedImageName(collectibleType.image, COLLECTIBLE_TYPE_IMAGE_PATH);
		}
	}

	logger.info("Saving collectible type", {service: LogService.COLLECTIBLE_TYPE_SERVICE, data: collectibleTypesToSave});
	await CollectibleTypeRepository.createMany(collectibleTypesToSave);
};

export default {
	saveCollectibleTypes
};
