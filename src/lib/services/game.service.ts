import logger from '$lib/helpers/logger';
import { saveBase64StringToFile } from "$lib/server/fileHandlers";
import type { CreateGame, CreateGameWithDropdownData } from '$types/domain/game';
import { LogService } from '$types/enums/LogService';
import * as GameRepository from '$lib/repositories/game.repository';
import { DatabaseException } from "$types/exceptions/DatabaseException";

/**
 * @throws DatabaseException
 * @param newGame
 */
export const create = async (newGame: CreateGameWithDropdownData): Promise<void> => {
	const { title, description, isDLC, releaseDate, coverImage } = newGame;

	const newGameToCreate: CreateGame = {
		title,
		description,
		isDLC,
		releaseDate,
		franchise: newGame.franchise?.label ?? null,
		parentTitle: newGame.parentTitle?.value ?? null,
		developers: newGame.developers.map(developer => ({ id: developer.id })),
		publishers: newGame.publishers.map(publisher => ({ id: publisher.id })),
		genres: newGame.genres.map(publisher => ({ id: publisher.id })),
		platforms: newGame.platforms.map(platform => ({ id: platform.id })),
		storefronts: newGame.storefronts.map(storefront => ({ id: storefront.id }))
	};

	logger.info('Saving new game', { service: LogService.NEW_GAME_SERVICE, data: newGameToCreate });

	const savedGameId = await GameRepository.create(newGameToCreate);

	if(coverImage) {
		const createdFileName = await saveBase64StringToFile(coverImage, "./src/lib/data/gameCovers/");

		if(createdFileName) {
			try {
				await GameRepository.updateCoverImage(savedGameId, createdFileName);
			} catch (error) {
				if(error instanceof DatabaseException) {
					throw new DatabaseException(error.message, 'warning');
				}
			}
		}

	}
};
