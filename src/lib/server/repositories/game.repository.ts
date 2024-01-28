import logger from '$lib/helpers/logger';
import prisma from '$lib/server/prisma';
import { LogService } from '$types/enums/LogService';
import { DatabaseException } from '$types/exceptions/DatabaseException';
import type { GameDropdownItem, GameToSave } from '$types/domain/game';
import type { Repository } from "$types/serverTypes";

export default class GameRepository implements Repository {

	readonly _service = LogService.GAME_REPOSITORY;

	async create(newGame: GameToSave): Promise<number> {
		logger.info('Saving new game', { service: this._service, data: newGame });
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
					Franchise: newGame.franchise !== null ? {connect: {id: newGame.franchise}}: undefined,
					Genres: { connect: newGame.genres },
					Publishers: { connect: newGame.publishers },
					Developers: { connect: newGame.developers },
					Platforms: { connect: newGame.platforms },
					Storefronts: { connect: newGame.storefronts }
				}
			});
			logger.info('Created game: ' + newGame.title, { service: this._service });
			return createdGame.id;
		} catch (error) {

			if(error instanceof Error) {
				logger.error('Error creating new game: ' + newGame.title, { service: this._service, errors: error.message});
			}

			throw new DatabaseException('An error occurred during game creation');
		}
	};

	async getParentTitlesForDropdownWithSearch(searchText: string): Promise<GameDropdownItem[]> {
		try {
			return await prisma.game.findMany({
				where: {
					title: { contains: searchText },
					is_dlc: false
				},
				select: {id: true, title: true}
			});
		} catch (error) {
			if (error instanceof Error) {
				logger.error('Error getting all parent titles for dropdown', { service: this._service, errors: error.message });
			}

			throw new DatabaseException('Error getting all parent titles for dropdown');
		}
	}

}
