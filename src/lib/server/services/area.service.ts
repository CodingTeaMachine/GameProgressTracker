import logger from "$lib/helpers/logger";
import ParentAreaFactory from "$lib/server/factories/areaFactories/ParentAreaFactory";
import type { Area, AreaToSave, ChildAreaToSave } from "$types/domain/area";
import { LogService } from "$types/enums/LogService";
import AreaRepository from '$lib/server/repositories/area.repository';
import AreaServiceHelper from '$lib/helpers/serviceHelpers/AreaServiceHelper';
import type { Service } from "$types/serverTypes";

export default class AreaService implements Service {

	readonly _service = LogService.AREA_SERVICE;

	private parentAreas: Area[] = [];
	private game_id: number = 0;

	save = async (areas: Area[], game_id: number)=> {
		this.game_id = game_id;
		this.parentAreas = areas.filter(area => area.parent_id === null);

		await this.saveParentAreas();
		await this.saveChildAreas(areas.filter(area => area.parent_id !== null));
	};

	private saveParentAreas = async ()=>  {
		const areasToSave: AreaToSave[] = [];

		for (const parentArea of this.parentAreas) {
			const area = await ParentAreaFactory.create(parentArea, this.game_id);
			areasToSave.push(area);
		}

		logger.info('Saving parent areas', {service: this._service, data: { areasToSave }});

		await AreaRepository.createMany(areasToSave);
	};

	private saveChildAreas = async (childAreas: Area[]) => {
		const areasToSave: ChildAreaToSave[] = [];
		const areaServiceHelper = new AreaServiceHelper();

		for (const childArea of childAreas) {
			const area = await areaServiceHelper.createChildArea(this.parentAreas,childArea, this.game_id);
			areasToSave.push(area);
		}

		logger.info('Saving child areas', {service: this._service, data: { areasToSave }});

		await AreaRepository.createMany(areasToSave);
	};
}
