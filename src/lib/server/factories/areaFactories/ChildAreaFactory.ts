import { AREA_IMAGE_PATH } from "$lib/data/constants";
import { getSavedImageName } from "$lib/server/imageHandler";
import type { Area, ChildAreaToSave } from "$types/domain/area";
import type { Factory } from "$types/serverTypes";

export default class ChildAreaFactory implements Factory<ChildAreaToSave>{

	static async create(area: Area, game_id: number, parentId: number): Promise<ChildAreaToSave> {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id, imageSrc, ...rest } = area;
		const areaToSave: ChildAreaToSave  = { ...rest, image: imageSrc, game_id, parent_id: parentId };


		if (areaToSave.image) {
			areaToSave.image = await getSavedImageName(areaToSave.image, AREA_IMAGE_PATH);
		}


		return areaToSave;
	}

}
