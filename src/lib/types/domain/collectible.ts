import { z } from 'zod';

export const CollectibleSchema = z.object({
	collectibleTypeId: z.number(),
	totalAmount: z.number().min(1),
	localId: z.number(),
	areaId: z.number().nullable(),
	title: z.string(),
	description: z.string(),
});

export type Collectible = z.infer<typeof CollectibleSchema>;

export type CollectibleToSave = {
	collectible_type_id: number;
	area_id: number | null;
	totalAmount: number;
	game_id: number;
	title: string;
	description?: string;
};
