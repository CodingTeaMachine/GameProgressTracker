import { GAME_COVER_IMAGE_PATH } from "$lib/data/constants";
import logger from '$lib/helpers/logger';
import { getSavedImageName } from "$lib/server/imageHandler";
import CollectibleTypeService from "$lib/server/services/collectibleType.service";
import type { Area } from "$types/domain/area";
import type { CollectibleType } from "$types/domain/collectibleType";
import type { CreateGame, CreateGameWithDropdownData } from '$types/domain/game';
import { LogService } from '$types/enums/LogService';
import * as GameRepository from '$lib/server/repositories/game.repository';
import AreaService from './area.service';


/**
 * @throws DatabaseException
 * @param newGame
 */
export const saveGame = async (newGame: CreateGameWithDropdownData): Promise<void> => {

	const newGameToCreate: CreateGame = {
		title: newGame.title,
		description: newGame.description,
		isDLC: newGame.isDLC,
		releaseDate: newGame.releaseDate,
		franchise: newGame.franchise,
		parentTitle: newGame.parentTitle?.value ?? null,
		cover: undefined,
		developers: newGame.developers.map(developer => ({ id: developer.id })),
		publishers: newGame.publishers.map(publisher => ({ id: publisher.id })),
		genres: newGame.genres.map(publisher => ({ id: publisher.id })),
		platforms: newGame.platforms.map(platform => ({ id: platform.id })),
		storefronts: newGame.storefronts.map(storefront => ({ id: storefront.id })),
	};

	if(newGame.coverImage) {
		newGameToCreate.cover = await getSavedImageName(newGame.coverImage, GAME_COVER_IMAGE_PATH);
	}

	logger.info('Saving new game', { service: LogService.GAME_SERVICE, data: newGameToCreate });
	const savedGameId = await GameRepository.create(newGameToCreate);

	/**
	 * Not sure if they should be parallelized because of how the images are being cached
	 * If that part of the app is refactored maybe this can run in parallel
	 */
	await AreaService.saveAreas(newGame.areas as Area[], savedGameId);
	await CollectibleTypeService.saveCollectibleTypes(newGame.collectibleTypes as CollectibleType[], savedGameId);
};

export default {
	create: saveGame
};
