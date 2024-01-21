import logger from "$lib/helpers/logger";
import AreaRepository from "$lib/server/repositories/area.repository";
import type { Area } from "$types/domain/area";
import { LogService } from "$types/enums/LogService";
import type { Store } from "$types/serverTypes";

export default class CachedAreaStore implements Store<number | null> {
	readonly _service = LogService.CACHED_AREA_STORE;

	private areas: Area[];
	private areaCache: Map<number, number> = new Map();
	private readonly gameId: number;

	constructor(areas: Area[], gameId: number) {
		this.areas = areas;
		this.gameId = gameId;
	}

	async get(areaLocalId: number | null): Promise<number | null> {

		if(areaLocalId === null) {
			return null;
		}

		if(this.areaCache.has(areaLocalId)) {
			logger.info("Hit cache with area id: " + areaLocalId, {service: this._service});
			return this.areaCache.get(areaLocalId) as number;
		}
		logger.warn("Missed cache with area id:" + areaLocalId, {service: this._service});

		const selectedArea = this.areas.find(area => area.id === areaLocalId) as Area;
		const areaFromDb = (await AreaRepository.findByTitleAndGame(selectedArea.title, this.gameId));

		this.areaCache.set(areaLocalId, areaFromDb.id);
		logger.info("Saved area to cache with id: " + areaLocalId, {service: this._service, data: {areaLocalId, cached: areaFromDb.id}});


		return areaFromDb.id;
	}
}
