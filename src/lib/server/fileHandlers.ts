import logger from "$lib/helpers/logger";
import { FileErrors } from "$types/enums/errors";
import { LogService } from "$types/enums/LogService";
import fs from 'node:fs/promises';
import imageType from 'image-type';

export async function fileExists(file: string): Promise<boolean> {
	try {
		await fs.stat(file);
		return true;
	} catch (error) {
		return false;
	}
}

export async function getFileExtensionFromBuffer(buffer: Buffer) {
	const type = await imageType(buffer);

	if(type === undefined) {
		logger.warn("Uploaded file has no extension", {service: LogService.FILE_HANDLER});
	}

	return type ? type.ext : null;
}

export async function createDirectoryIfItDoesntExist(directory: string) {
	try {
		await fs.stat(directory);
	} catch (error) {
		if(error instanceof Error && 'code' in error && error.code === FileErrors.DOESNT_EXITS) {
			await fs.mkdir(directory, {recursive: true});
		} else {
			throw error;
		}
	}
}
