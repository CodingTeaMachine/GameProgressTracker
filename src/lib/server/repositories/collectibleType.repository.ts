import logger from "$lib/helpers/logger";
import prisma from "$lib/server/prisma";
import type { CollectibleTypeToSave } from "$types/domain/collectibleType";
import { LogService } from "$types/enums/LogService";
import { DatabaseException } from "$types/exceptions/DatabaseException";

export const createMany = async (collectibleTypes: CollectibleTypeToSave[]) => {
	try {
		await prisma.collectibleType.createMany({
			data: collectibleTypes
		});
	} catch (error) {
		if(error instanceof Error) {
			logger.error(
				`Error creating collectible types`,
				{ service: LogService.AREA_REPOSITORY, data: collectibleTypes,
					errors: error.message}
			);
		}

		throw new DatabaseException(`Error saving collectible types`);
	}
};

export default {
	createMany
};
