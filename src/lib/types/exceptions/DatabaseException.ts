import type { ErrorSeverity } from '$types/clientTypes';
import { GPTError } from '$types/exceptions/KnownError';

export class DatabaseException extends GPTError {
	constructor(public errorMessage: string, severity: ErrorSeverity = 'error') {
		super(errorMessage, severity);
	}
}
