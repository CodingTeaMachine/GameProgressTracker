import { COLLECTIBLE_TYPE_IMAGE_PATH } from "$lib/data/constants";
import { getSavedImageName } from "$lib/server/imageHandler";
import type { CollectibleType, CollectibleTypeToSave } from "$types/domain/collectibleType";
import type { Factory } from "$types/serverTypes";

export default class CollectibleTypeToSaveFactory implements Factory<CollectibleTypeToSave> {

	static async create(collectibleType: CollectibleType, gameId: number): Promise<CollectibleTypeToSave> {
		const collectibleTypeToSave: CollectibleTypeToSave = {
			title: collectibleType.title,
			description: collectibleType.description,
			image: collectibleType.imageSrc,
			game_id: gameId
		};

		if(collectibleTypeToSave.image) {
			collectibleTypeToSave.image = await getSavedImageName(collectibleTypeToSave.image, COLLECTIBLE_TYPE_IMAGE_PATH);
		}

		return collectibleTypeToSave;
	}

}
