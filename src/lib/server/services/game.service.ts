import GameToSaveFactory from '$lib/server/factories/GameToSaveFactory';
import AchievementService from '$lib/server/services/achievement.service';
import CollectibleService from '$lib/server/services/collectible.service';
import CollectibleTypeService from '$lib/server/services/collectibleType.service';
import type { GameToSave, CreateGameWithDropdownData, GameDropdownItem, ExplorePageGame } from '$types/domain/game';
import GameRepository from '$lib/server/repositories/game.repository';
import { LogService } from '$types/enums/LogService';
import type { ExplorePageSearch, Service, ServicePagination } from '$types/serverTypes';
import AreaService from './area.service';
import ServicePaginationToRepositoryPaginationAdapter from '../adapters/ServiceToRepositoryPaginationAdapter';
import { DEFAULT_ITEMS_PER_PAGE } from '$/lib/data/constants';

export default class GameService implements Service {
	readonly _service = LogService.GAME_SERVICE;

	async getTotalAmount(search: ExplorePageSearch): Promise<number> {
		return await new GameRepository().getTotalAmount(search);
	}

	async getForExplorePage(
		pagination: ServicePagination = { page: 1, perPage: DEFAULT_ITEMS_PER_PAGE },
		search: ExplorePageSearch = {title: ''},
	): Promise<ExplorePageGame[]> {
		return await new GameRepository().getForExplorePage(
			ServicePaginationToRepositoryPaginationAdapter.getRepositoryPagination(pagination),
			search
		);
	}

	/**
	 * @throws DatabaseException
	 * @param newGame
	 */
	async save(newGame: CreateGameWithDropdownData) {
		const newGameToCreate: GameToSave = await GameToSaveFactory.create(newGame);
		const savedGameId = await new GameRepository().create(newGameToCreate);

		/**
		 * Not sure if they should be parallelized because of how the images are being cached
		 * If that part of the app is refactored maybe this can run in parallel
		 */
		await new AreaService().save(newGame.areas, savedGameId);
		await new CollectibleTypeService().save(newGame.collectibleTypes, savedGameId);
		await new CollectibleService().save(newGame.collectibles, newGame.areas, newGame.collectibleTypes, savedGameId);
		await new AchievementService().save(newGame.achievements, savedGameId);
	}

	async getParentTitles(searchText: string): Promise<GameDropdownItem[]> {
		return await new GameRepository().getParentTitlesForDropdownWithSearch(searchText);
	}
}
