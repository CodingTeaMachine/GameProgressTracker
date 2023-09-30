const requiredMessage = (field: string) => `${field} is required`;
const textTypeRequired = (field: string) => `${field} must be a text`;
const minLengthRequired = (field: string, length: number) => `${field} must be at least ${length} characters long`;
const invalidFormat = (field: string) => `Invalid ${field} format`;
const fieldAlreadyExists = (context: string, field: string) => `A(n) ${context} with this ${field} already exits`;

export const errorMessages = {
	username: {
		required: requiredMessage('Username'),
		invalid_type: textTypeRequired('Username'),
		min_length: (length: number) => minLengthRequired('Username', length),
		taken: fieldAlreadyExists('user', 'username')
	},
	email: {
		required: requiredMessage('E-mail'),
		invalid_type: textTypeRequired('E-mail'),
		min_length: (length: number) => minLengthRequired('E-mail', length),
		invalid_format: invalidFormat('e-mail'),
		taken: fieldAlreadyExists('user', 'e-mail')
	},
	password: {
		required: requiredMessage('Password'),
		invalid_type: textTypeRequired('Password'),
		min_length: (length: number) => minLengthRequired('Password', length),
		invalid_password_schema:
			'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)',
		not_matching_password: "The provided passwords don't match"
	},
	login: {
		invalid_username_or_password: 'Invalid username or password'
	},
	unknown: 'An unexpected error occurred'
};

export const luciaErrors = {
	invalid_key: 'AUTH_INVALID_KEY_ID',
	invalid_password: 'AUTH_INVALID_PASSWORD'
};
