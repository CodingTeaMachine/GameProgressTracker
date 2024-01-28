import { z } from 'zod';
export const CollectibleTypeSchema = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	image: z.undefined(), // This is always empty, imageSrc holds the image as a base64 string
	imageSrc: z.string()
});

export type CollectibleType = z.infer<typeof CollectibleTypeSchema>;

export type CollectibleTypeToSave = Omit<CollectibleType, 'id' | 'image' | 'imageSrc'> & {
	image: string | undefined;
	game_id: number;
};
