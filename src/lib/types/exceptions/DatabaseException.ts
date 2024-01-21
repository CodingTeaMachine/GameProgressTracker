import type { ErrorSeverity } from "$types/clientTypes";

export class DatabaseException extends Error {

	severity: ErrorSeverity;
	constructor(message: string, severity: ErrorSeverity = 'error') {
		super(message);
		this.severity = severity;
	}
}
