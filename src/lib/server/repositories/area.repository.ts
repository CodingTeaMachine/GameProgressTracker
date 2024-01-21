import logger from "$lib/helpers/logger";
import prisma from '$lib/server/prisma';
import type { AreaToSave, ChildAreaToSave, SimpleArea } from "$types/domain/area";
import { LogService } from "$types/enums/LogService";
import { DatabaseException } from "$types/exceptions/DatabaseException";

export const createMany = async (areas: AreaToSave[] | ChildAreaToSave[]) => {
	try {
		await prisma.area.createMany({
			data: areas,
		});
	} catch (error) {
		if(error instanceof Error) {
			logger.error(
				`Error creating areas`,
				{ service: LogService.AREA_REPOSITORY, data: areas,
					errors: error.message}
			);
		}

		throw new DatabaseException(`Error saving areas`);
	}
};

export const getAreasByTitle = async (titles: string[]): Promise<SimpleArea[]> => {
	try {
		const aresByTitle = await prisma.area.findMany({
			where: { title: { in: titles, } },
			select: { id: true, title: true }
		});

		logger.info("Read areas by title", {service: LogService.AREA_REPOSITORY, data: {titles, aresByTitle}});

		return aresByTitle;
	} catch (error) {

		if(error instanceof Error) {
			logger.error(
				`Error reading areas by title`,
				{ service: LogService.AREA_REPOSITORY, data: titles,
					errors: error.message}
			);
		}


		throw new DatabaseException(`Error getting areas by title`);
	}
};

export const findByTitleAndGame = async (title: string, game_id: number) => {
	try {
		const area = await prisma.area.findFirstOrThrow({
			where: {title, game_id}
		});

		logger.info(`Read collectible type by title and game_id`, {
			service: LogService.AREA_REPOSITORY,
			data: { area, title, game_id },
		});

		return area;
	} catch (error) {
		if(error instanceof Error) {
			logger.error(`Error reading area by title and game_id`, {
				service: LogService.AREA_REPOSITORY,
				data: { title, game_id },
				errors: error.message
			});
		}

		throw new DatabaseException(`Error reading area`);
	}
};

export default {
	createMany,
	getAreasByTitle,
	findByTitleAndGame
};
