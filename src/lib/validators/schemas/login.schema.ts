import { z } from 'zod';
import { errorMessages } from '$lib/validators/errorMesages';

export const loginSchema = z.object({
	username: z.string({
		required_error: errorMessages.username.required,
		invalid_type_error: errorMessages.username.invalid_type
	}),
	password: z.string({
		required_error: errorMessages.password.required,
		invalid_type_error: errorMessages.password.invalid_type
	})
});
