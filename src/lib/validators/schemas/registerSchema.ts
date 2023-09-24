import { z } from 'zod';
import { errorMessages } from '$lib/validators/schemas/errorMesages';
import { MIN_USERNAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_EMAIL_LENGTH } from '$lib/data/constants';

export const registerSchema = z
	.object({
		username: z
			.string({
				required_error: errorMessages.username.required,
				invalid_type_error: errorMessages.username.invalid_type
			})
			.min(MIN_USERNAME_LENGTH, errorMessages.username.min_length(MIN_USERNAME_LENGTH)),
		email: z
			.string({
				required_error: errorMessages.email.required,
				invalid_type_error: errorMessages.email.invalid_type
			})
			.email(errorMessages.email.invalid_format)
			.min(MIN_EMAIL_LENGTH, errorMessages.email.min_length(MIN_EMAIL_LENGTH)),
		password: z
			.string({
				required_error: errorMessages.password.required,
				invalid_type_error: errorMessages.password.invalid_type
			})
			.min(MIN_PASSWORD_LENGTH, errorMessages.password.min_length(MIN_PASSWORD_LENGTH))
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
				errorMessages.password.invalid_password_schema
			),
		confirmPassword: z.string({
			required_error: errorMessages.password.required,
			invalid_type_error: errorMessages.password.invalid_type
		})
	})
	.refine(data => data.password === data.confirmPassword, {
		message: errorMessages.password.not_matching_password,
		path: ['confirmPassword']
	});
