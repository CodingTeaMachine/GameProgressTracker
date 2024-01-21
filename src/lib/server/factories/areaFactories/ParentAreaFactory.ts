import { AREA_IMAGE_PATH } from "$lib/data/constants";
import { getSavedImageName } from "$lib/server/imageHandler";
import type { Area, AreaToSave } from "$types/domain/area";
import type { Factory } from "$types/serverTypes";

export default class ParentAreaFactory implements Factory<AreaToSave>{
	static async create(area: Area, game_id: number): Promise<AreaToSave> {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id, imageSrc, parent_id, ...rest } = area;

		const areaToSave: AreaToSave = ({ ...rest, image: imageSrc, game_id });

		if (areaToSave.image) {
			areaToSave.image = await getSavedImageName(areaToSave.image, AREA_IMAGE_PATH);
		}

		return areaToSave;
	}
}
