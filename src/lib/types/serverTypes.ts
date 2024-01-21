import type { LogService } from "$types/enums/LogService";

export type Service = Loggable & {}

export type Repository = Loggable & {}

export type Factory<T> = {
	// This is an optional property, because it can be static on the factory
	create?: (...params: any) => T | Promise<T>
}

export type Loggable = {
	readonly _service: LogService
}

export type Store<T> = Loggable & {
	get: (...params: any) => T | Promise<T>
}
