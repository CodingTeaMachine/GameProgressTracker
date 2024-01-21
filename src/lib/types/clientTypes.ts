import type { ListTodo } from "lucide-svelte";
import type { message } from "sveltekit-superforms/server";
import type { toZod } from "tozod";
import { z } from "zod";


export type Icon = typeof ListTodo;

export type GeneralDropdownData = {
	label: string;
	value: number;
}

export const GeneralDropdownDataSchema: toZod<GeneralDropdownData> = z.object({
	label: z.string(),
	value: z.number(),
});

export const GeneralDatabaseDropdownItemSchema = z.object({
	id: z.number(),
	label: z.string(),
});

export const GeneralDatabaseDropdownItemWithNameSchema = z.object({
	id: z.number(),
	name: z.string(),
});

export type SuccessfulAction = {
	form: object;
	success: true;
}

export type FailResponse = {
	form: object;
	errorMessage?: string;
	severity?: ErrorSeverity;
}

export type FailResponseWithMessage = ReturnType<typeof message>;

export type ErrorSeverity = 'warning' | 'error';
