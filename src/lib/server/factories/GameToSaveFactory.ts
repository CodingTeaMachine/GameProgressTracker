import { GAME_COVER_IMAGE_PATH } from "$lib/data/constants";
import { getSavedImageName } from "$lib/server/imageHandler";
import FranchiseService from '$lib/server/services/franchise.service';
import type { GeneralDropdownData } from '$types/clientTypes';
import type { GameToSave, CreateGameWithDropdownData } from "$types/domain/game";
import type { Factory } from "$types/serverTypes";

export default class GameToSaveFactory implements Factory<GameToSave> {
	static async create(newGame: CreateGameWithDropdownData): Promise<GameToSave> {
		return  {
			title: newGame.title,
			description: newGame.description,
			isDLC: newGame.isDLC,
			releaseDate: newGame.releaseDate,
			franchise: await GameToSaveFactory.getFranchiseId(newGame.franchise),
			parentTitle: newGame.parentTitle?.value ?? null,
			cover: newGame.coverImage ? await getSavedImageName(newGame.coverImage, GAME_COVER_IMAGE_PATH) : undefined,
			developers: newGame.developers.map(developer => ({ id: developer.id })),
			publishers: newGame.publishers.map(publisher => ({ id: publisher.id })),
			genres: newGame.genres.map(publisher => ({ id: publisher.id })),
			platforms: newGame.platforms.map(platform => ({ id: platform.id })),
			storefronts: newGame.storefronts.map(storefront => ({ id: storefront.id })),
		};
	}

	static async getFranchiseId(franchise: GeneralDropdownData | null): Promise<number | null> {
		if(franchise === null) return null;

		// If the number is negative, it means it was created in the select input
		if(franchise.value > 0) return franchise.value;

		const savedFranchise = await new FranchiseService().save(franchise.label);

		return savedFranchise.id;
	}
}
