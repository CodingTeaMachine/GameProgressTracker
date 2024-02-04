import type { ErrorSeverity } from '$types/clientTypes';

export class GPTError extends Error {
	constructor(public errorMessage: string, public severity: ErrorSeverity = 'error') {
		super(errorMessage);
	}
}
