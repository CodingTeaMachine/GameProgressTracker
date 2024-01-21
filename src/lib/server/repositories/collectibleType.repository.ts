import logger from "$lib/helpers/logger";
import prisma from "$lib/server/prisma";
import type { CollectibleTypeToSave } from "$types/domain/collectibleType";
import { LogService } from "$types/enums/LogService";
import { DatabaseException } from "$types/exceptions/DatabaseException";
import type { Repository } from "$types/serverTypes";

export default class CollectibleTypeRepository implements Repository{
	readonly _service = LogService.COLLECTIBLE_TYPE_REPOSITORY;

	async createMany(collectibleTypes: CollectibleTypeToSave[]) {
		try {
			await prisma.collectibleType.createMany({
				data: collectibleTypes
			});
		} catch (error) {
			if(error instanceof Error) {
				logger.error(`Error creating collectible types`, { service: this._service, data: collectibleTypes,
						errors: error.message});
			}

			throw new DatabaseException(`Error saving collectible types`);
		}
	}

	async findByTitleAndGame(title: string, game_id: number){
		try {
			const collectibleType = await prisma.collectibleType.findFirstOrThrow({
				where: {title, game_id}
			});

			logger.info(`Read collectible type by title and game_id`, {
				service: this._service,
				data: { collectibleType, title, game_id },
			});

			return collectibleType;
		} catch (error) {
			if(error instanceof Error) {
				logger.error(`Error reading collectible type by title and game_id`, {
					service: this._service,
					data: { title, game_id },
					errors: error.message
				});
			}

			throw new DatabaseException(`Error reading collectible type`);
		}
	}
}
