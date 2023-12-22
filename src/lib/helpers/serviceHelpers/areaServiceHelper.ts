import { AREA_IMAGE_PATH } from '$lib/data/constants';
import { getSavedImageName } from "$lib/server/imageHandler";
import * as AreaRepository from '$lib/server/repositories/area.repository';
import type { Area, AreaToSave, ChildAreaToSave } from '$types/domain/area';

export const parentAreaCache: Map<string, number> = new Map();

export const createAreaToSave = async (area: Area, game_id: number): Promise<AreaToSave> => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { id, imageSrc, parent_id, ...rest } = area;

	const areaToSave: AreaToSave = { ...rest, image: imageSrc, game_id };

	if (areaToSave.image) {
		areaToSave.image = await getSavedImageName(areaToSave.image, AREA_IMAGE_PATH);
	}

	return areaToSave;
};

export const createChildAreaToSave = async (
	parentAreas: Area[],
	area: Area,
	game_id: number
): Promise<ChildAreaToSave> => {
	if (parentAreaCache.size === 0) {
		await fillParentAreaCache(parentAreas.map(area => area.title));
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { id, imageSrc, ...rest } = area;

	const parentArea = parentAreas.find(parentArea => parentArea.id === area.parent_id) as Area;
	const parentAreaId = parentAreaCache.get(parentArea.title) as number;

	const areaToSave: ChildAreaToSave = { ...rest, image: imageSrc, game_id, parent_id: parentAreaId };

	if (areaToSave.image) {
		areaToSave.image = await getSavedImageName(areaToSave.image, AREA_IMAGE_PATH);
	}

	return areaToSave;
};


const fillParentAreaCache = async (parentTitles: string[]) => {
	const parentAreasFromDb = await AreaRepository.getAreasByTitle(parentTitles);

	parentAreasFromDb.map(area => parentAreaCache.set(area.title, area.id));
};

export default {
	parentAreaCache,
	createAreaToSave,
	createChildAreaToSave,
};
