import { StorefrontType } from "$types/enums/storefrontType";
import { z } from 'zod';

export const StorefrontSelectSchema = z.object({
	id: z.number(),
	name: z.string(),
	has_achievements: z.boolean(),
	Type: z.object({
		name: z.nativeEnum(StorefrontType),
	}),
	AchievementGrades: z.object({
		id: z.number(),
		label: z.string()
	}).array()
});

export type StorefrontDropdownItem = z.infer<typeof StorefrontSelectSchema>;
