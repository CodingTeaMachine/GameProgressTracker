import { z } from 'zod';

export type CollectibleType = {
	id: number;
	title: string;
	description: string;
	image: FileList | undefined;
	imageSrc: string;
};

export type CollectibleTypeToSave = Omit<CollectibleType, 'id' | 'image' | 'imageSrc'> & {
	image: string | undefined;
	game_id: number;
};

export const CollectibleTypeSchema = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	image: z.undefined(), // This is always empty, imageSrc holds the image as a base64 string
	imageSrc: z.string()
});
