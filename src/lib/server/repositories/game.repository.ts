import logger from '$lib/helpers/logger';
import prisma from '$lib/server/prisma';
import { LogService } from '$types/enums/LogService';
import { DatabaseException } from '$types/exceptions/DatabaseException';
import type { CreateGame } from '$types/domain/game';


export const create = async (newGame: CreateGame): Promise<number> => {
	try {
		const createdGame = await prisma.game.create({
			data: {
				title: newGame.title,
				description: newGame.description,
				is_dlc: newGame.isDLC,
				release_date: newGame.releaseDate,
				cover: newGame.cover,
				Parent: newGame.parentTitle !== null
					? { connect: { id: newGame.parentTitle as number, } }
					: undefined,
				Franchise:
					newGame.franchise
						? {
							connectOrCreate: {
								where: {id: newGame.franchise?.value},
								create: {title: newGame.franchise?.label as string},
							}
						}
						: undefined,
				Genres: { connect: newGame.genres },
				Publishers: { connect: newGame.publishers },
				Developers: { connect: newGame.developers },
				Platforms: { connect: newGame.platforms },
				Storefronts: { connect: newGame.storefronts }
			}
		});
		logger.info('Created game: ' + newGame.title, { service: LogService.GAME_REPOSITORY });
		return createdGame.id;
	} catch (error) {

		if(error instanceof Error) {
			logger.error('Error creating new game: ' + newGame.title, { service: LogService.GAME_REPOSITORY, errors: error.message});
		}

		throw new DatabaseException('An error occurred during game creation');
	}
};

export default {
	create
};
