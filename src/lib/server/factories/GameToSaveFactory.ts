import { GAME_COVER_IMAGE_PATH } from "$lib/data/constants";
import { getSavedImageName } from "$lib/server/imageHandler";
import type { GameToSave, CreateGameWithDropdownData } from "$types/domain/game";
import type { Factory } from "$types/serverTypes";

export default class GameToSaveFactory implements Factory<GameToSave> {
	static async create(newGame: CreateGameWithDropdownData): Promise<GameToSave> {
		const gameToCreate: GameToSave = {
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
			gameToCreate.cover = await getSavedImageName(newGame.coverImage, GAME_COVER_IMAGE_PATH);
		}

		return gameToCreate;
	}
}
