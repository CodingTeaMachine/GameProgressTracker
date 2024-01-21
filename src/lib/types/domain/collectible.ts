import { z } from 'zod';

export type Collectible = {
	collectibleTypeId: number;
	totalAmount: number;
	localId: number;
};
export type CollectibleWithAreaId = Collectible & { areaId: number | null };

export type CollectibleToSave = {
	collectible_type_id: number;
	area_id: number | null;
	totalAmount: number;
	game_id: number;
};

export const CollectibleSchema = z.object({
	collectibleTypeId: z.number(),
	totalAmount: z.number().min(1),
	localId: z.number(),
	areaId: z.number().nullable()
});
