import type { LogService } from '$types/enums/LogService';

//There might be extra properties on these

// eslint-disable-next-line @typescript-eslint/ban-types
export type Service = Loggable & {};

// eslint-disable-next-line @typescript-eslint/ban-types
export type Repository = Loggable;

export type Factory<T> = {
	// This is an optional property, because it can be static on the factory
	create?: (...params: any) => T | Promise<T>;
};

export type Loggable = {
	readonly _service: LogService;
};

export type Store<T> = Loggable & {
	get: (...params: any) => T | Promise<T>;
};

export type LoadingError = {
	errorMessage?: string;
};

export type RepositoryPagination = {
	take: number;
	skip: number;
};

export type ServicePaginationInput = {
	page: string;
	perPage: string;
};

export type ServicePagination = {
	page: number;
	perPage: number;
};

export type ExplorePageSearch = {
	title?: string;
};
