const requiredMessage = (field: string) => `${field} is required`;
const textTypeRequired = (field: string) => `${field} must be a text`;
const booleanTypeRequired = (field: string) => `${field} must be a boolean`;
const dateTypeRequired = (field: string) => `${field} must be a date`;
const numberTypeRequired = (field: string) => `${field} must be a number`;
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
	newGame: {
		coverImage: {
			required: requiredMessage('Cover Image'),
		},
		title: {
			required: requiredMessage('Title'),
			invalid_type: textTypeRequired('Title'),
			min_length: (length: number) => minLengthRequired('Title', length),
		},
		description: {
			required: requiredMessage('Description'),
			invalid_type: textTypeRequired('Description'),
			min_length: (length: number) => minLengthRequired('Description', length),
		},
		franchise: {
			invalid_type: numberTypeRequired('Franchise'),
		},
		dlc: {
			required: requiredMessage('DLC'),
			invalid_type: booleanTypeRequired('DLC'),
		},
		releaseDate: {
			required: requiredMessage('Release Date'),
			invalid_type: dateTypeRequired('Release Date'),
		},
	},

	unknown: 'An unexpected error occurred'
};

export const luciaErrors = {
	invalid_key: 'AUTH_INVALID_KEY_ID',
	invalid_password: 'AUTH_INVALID_PASSWORD'
};
