import logger from "$lib/helpers/logger";
import prisma from "$lib/server/prisma";
import type { CollectibleToSave } from "$types/domain/collectible";
import { LogService } from "$types/enums/LogService";
import { DatabaseException } from "$types/exceptions/DatabaseException";


export const createMany = async (collectibles: CollectibleToSave[]) => {
	try {
		await prisma.collectible.createMany({
			data: collectibles
		});
		logger.info("Created collectibles", { service: LogService.COLLECTIBLE_REPOSITORY, data: collectibles});
	} catch (error) {
		if(error instanceof Error) {
			logger.error(
				`Error creating collectibles`,
				{ service: LogService.COLLECTIBLE_REPOSITORY, data: collectibles, errors: error.message}
			);
		}

		throw new DatabaseException(`Error creating collectibles`);
	}
};

export default {
	createMany
};
