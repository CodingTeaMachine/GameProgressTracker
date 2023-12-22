import logger from "$lib/helpers/logger";
import type { Area, AreaToSave, ChildAreaToSave } from "$types/domain/area";
import { LogService } from "$types/enums/LogService";
import AreaRepository from '$lib/server/repositories/area.repository';
import AreaServiceHelpers from '$lib/helpers/serviceHelpers/areaServiceHelper';


const saveAreas = async (areas: Area[], game_id: number)=> {
	await saveParentAreas(areas, game_id);
	await saveChildAreas(areas, game_id);

	//This should only be used for the creation of single games
	AreaServiceHelpers.parentAreaCache.clear();
};

const saveParentAreas = async (areas: Area[], game_id: number)=>  {
	const parentAreas = areas.filter(area => area.parent_id === null);

	const areasToSave: AreaToSave[] = [];

	for (const parentArea of parentAreas) {
		const area = await AreaServiceHelpers.createAreaToSave(parentArea, game_id);
		areasToSave.push(area);
	}

	logger.info('Saving parent areas', {service: LogService.AREA_SERVICE, data: { areasToSave }});
	await AreaRepository.createMany(areasToSave);
};

const saveChildAreas = async (areas: Area[], game_id: number) => {

	const parentAreas = areas.filter(area => area.parent_id === null);
	const childAreas = areas.filter(area => area.parent_id !== null);

	const areasToSave: ChildAreaToSave[] = [];

	for (const childArea of childAreas) {
		const area = await AreaServiceHelpers.createChildAreaToSave(parentAreas,childArea, game_id);
		areasToSave.push(area);
	}


	logger.info('Saving child areas', {service: LogService.AREA_SERVICE, data: { areasToSave }});
	await AreaRepository.createMany(areasToSave);
};


export default {
	saveAreas,
};
