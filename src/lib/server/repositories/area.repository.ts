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
			where: {
				title: {
					in: titles,
				}
			},
			select: {
				id: true,
				title: true
			}
		});

		logger.info("Read aras by title", {service: LogService.AREA_REPOSITORY, data: {titles, aresByTitle}});

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

export default {
	createMany,
	getAreasByTitle,
};
