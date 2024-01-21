import logger from "$lib/helpers/logger";
import ChildAreaFactory from "$lib/server/factories/areaFactories/ChildAreaFactory";
import * as AreaRepository from '$lib/server/repositories/area.repository';
import { LogService } from "$types/enums/LogService";

import type { Area, ChildAreaToSave } from '$types/domain/area';
import type { Loggable } from "$types/serverTypes";

export default class AreaServiceHelper implements Loggable {
	readonly _service = LogService.AREA_SERVICE_HELPER;
	private parentAreaCache: Map<string, number> = new Map();

	constructor() {
		// In TS this is a destructor...
		new FinalizationRegistry(
			(cache: typeof this.parentAreaCache) => {
				cache.clear();
				logger.info("Cleared parent area cache", {service: this._service});
			})
			.register(this, this.parentAreaCache);
	}

	async createChildArea(parentAreas: Area[], area: Area, game_id: number): Promise<ChildAreaToSave> {
		if (this.parentAreaCache.size === 0) {
			await this.fillParentAreaCache(parentAreas.map(area => area.title));
		}

		const parentArea = parentAreas.find(parentArea => parentArea.id === area.parent_id) as Area;
		const parentAreaId = this.parentAreaCache.get(parentArea.title) as number;

		return await ChildAreaFactory.create(area, game_id, parentAreaId);
	}

	private async fillParentAreaCache (parentTitles: string[]) {
		const parentAreasFromDb = await AreaRepository.getAreasByTitle(parentTitles);

		parentAreasFromDb.map(area => this.parentAreaCache.set(area.title, area.id));
	};

}
