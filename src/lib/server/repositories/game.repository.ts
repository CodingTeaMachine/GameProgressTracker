import logger from '$lib/helpers/logger';
import prisma from '$lib/server/prisma';
import { LogService } from '$types/enums/LogService';
import { DatabaseException } from '$types/exceptions/DatabaseException';
import type { ExplorePageGame, GameDropdownItem, GameToSave } from '$types/domain/game';
import type { ExplorePageSearch, Repository, RepositoryPagination } from '$types/serverTypes';

export default class GameRepository implements Repository {
	readonly _service = LogService.GAME_REPOSITORY;

	async getTotalAmount(search: ExplorePageSearch): Promise<number> {
		try {
			return await prisma.game.count({
				where: {
					title: {
						contains: search.title,
						mode: 'insensitive'
					}
				}
			});
		} catch (error) {
			if (error instanceof Error) {
				logger.error('Could not get total amount of games', {
					service: this._service,
					errors: error.message
				});
			}

			throw new DatabaseException('Could not get total amount of games');
		}
	}

	async getForExplorePage(
		{ take, skip }: RepositoryPagination,
		search: ExplorePageSearch
	): Promise<ExplorePageGame[]> {
		try {
			return await prisma.game.findMany({
				take,
				skip,
				select: {
					id: true,
					title: true,
					cover: true,
					Platforms: {
						select: {
							name: true,
							shorthand: true
						}
					}
				},
				orderBy: {
					title: 'asc'
				},
				where: {
					title: {
						contains: search.title,
						mode: 'insensitive'
					}
				}
			});
		} catch (error) {
			if (error instanceof Error) {
				logger.error('Could not get games for explore page', {
					service: this._service,
					errors: error.message
				});
			}

			throw new DatabaseException('Error loading games');
		}
	}
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
					Parent:
						newGame.parentTitle !== null ? { connect: { id: newGame.parentTitle as number } } : undefined,
					Franchise: newGame.franchise !== null ? { connect: { id: newGame.franchise } } : undefined,
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
			if (error instanceof Error) {
				logger.error('Error creating new game: ' + newGame.title, {
					service: this._service,
					errors: error.message
				});
			}

			throw new DatabaseException('An error occurred during game creation');
		}
	}

	async getParentTitlesForDropdownWithSearch(searchText: string): Promise<GameDropdownItem[]> {
		try {
			return await prisma.game.findMany({
				where: {
					title: { contains: searchText },
					is_dlc: false
				},
				select: { id: true, title: true }
			});
		} catch (error) {
			if (error instanceof Error) {
				logger.error('Error getting all parent titles for dropdown', {
					service: this._service,
					errors: error.message
				});
			}

			throw new DatabaseException('Error getting all parent titles for dropdown');
		}
	}
}
