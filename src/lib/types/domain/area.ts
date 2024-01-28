import { z } from 'zod';

export const AreaSchema = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	imageSrc: z.string(),
	parent_id: z.number().nullable()
});

export type Area = z.infer<typeof AreaSchema>

export type ChildAreaToSave = Omit<Area, 'id' | 'image' | 'imageSrc'> & {
	image: string | undefined;
	game_id: number;
};

export type AreaToSave = Omit<ChildAreaToSave, "parent_id">;

export type SimpleArea = {
	id: number;
	title: string;
}
