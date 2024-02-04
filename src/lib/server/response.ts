import { json } from '@sveltejs/kit';
import { HttpStatusCode } from 'axios';

export function jsonResponse(data: any, init?: ResponseInit): Response {
	return json({ data }, init);
}

export function errorResponse(message: string, status: HttpStatusCode = HttpStatusCode.InternalServerError) {
	return json({ errorMessage: message }, { status });
}
