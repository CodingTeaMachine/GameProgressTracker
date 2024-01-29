export type JSONResponse<T> = {
	data: T
};

export type ErrorResponse<T = string> = {
	error: T
}
