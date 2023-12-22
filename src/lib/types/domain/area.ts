import { z } from 'zod';

export type Area = {
	id: number;
	title: string;
	description: string;
	image: FileList | undefined;
	imageSrc?: string;
	parent_id: number | null;
};

export type ChildAreaToSave = Omit<Area, 'id' | 'image' | 'imageSrc'> & {
	image: string | undefined;
	game_id: number;
};

export type AreaToSave = Omit<ChildAreaToSave, "parent_id">;


export const AreaInputListSchema = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	image: z.undefined(), // This is always empty, imageSrc holds the image as a base64 string
	imageSrc: z.string(),
	parent_id: z.number().nullable()
});

export type SimpleArea = {
	id: number;
	title: string;
}
