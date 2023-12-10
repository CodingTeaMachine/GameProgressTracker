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
				Parent: newGame.parentTitle !== null
					? { connect: { id: newGame.parentTitle as number, } }
					: undefined,
				Franchise: {
					connectOrCreate: {
						where: {title: newGame.franchise ?? undefined},
						create: {title: newGame.franchise as string},
					},
				},
				Genres: { connect: newGame.genres },
				Publishers: { connect: newGame.publishers },
				Developers: { connect: newGame.developers },
				Platforms: { connect: newGame.platforms },
				Storefronts: { connect: newGame.storefronts }
			}
		});
		logger.info('Created game: ' + newGame.title, { service: LogService.NEW_GAME_REPOSITORY });
		return createdGame.id;
	} catch (error) {

		if(error instanceof Error) {
			logger.error('Error creating new game: ' + newGame.title, { service: LogService.NEW_GAME_REPOSITORY, errors: error.message});
		}

		throw new DatabaseException('An error occurred during game creation');
	}
};

export const updateCoverImage = async (id:number, fileName: string): Promise<void> => {
	try {
		await prisma.game.update({
			where: { id },
			data: { cover: fileName }
		});
	} catch (error) {
		if(error instanceof Error) {
			logger.error(`Error updating cover image for game: ${id} to ${fileName}`, { service: LogService.NEW_GAME_REPOSITORY, errors: error.message});
		}

		throw new DatabaseException(`Error uploading image`);
	}
};
