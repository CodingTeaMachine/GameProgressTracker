import GameToSaveFactory from "$lib/server/factories/GameToSaveFactory";
import CollectibleService from "$lib/server/services/collectible.service";
import CollectibleTypeService from "$lib/server/services/collectibleType.service";
import type { Area } from "$types/domain/area";
import type { CollectibleType } from "$types/domain/collectibleType";
import type { GameToSave, CreateGameWithDropdownData } from '$types/domain/game';
import GameRepository from '$lib/server/repositories/game.repository';
import { LogService } from "$types/enums/LogService";
import type { Service } from "$types/serverTypes";
import AreaService from './area.service';

export default class GameService implements Service {
	readonly _service = LogService.GAME_SERVICE;


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
		await new AreaService().save(newGame.areas as Area[], savedGameId);
		await new CollectibleTypeService().save(newGame.collectibleTypes as CollectibleType[], savedGameId);
		await new CollectibleService().save(
			newGame.collectibles,
			newGame.areas as Area[],
			newGame.collectibleTypes as CollectibleType[],
			savedGameId
		);
	}
}
