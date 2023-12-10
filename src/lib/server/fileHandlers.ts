import logger from "$lib/helpers/logger";
import { LogService } from "$types/enums/LogService";
import fs from 'node:fs/promises';
import imageType from 'image-type';
import {randomUUID} from 'crypto';
import path from 'path';

export async function saveBase64StringToFile(base64String: string, filePath: string, fileName: string | null = null, fileExtension: string | null = null): Promise<string | null> {
	// Remove the data URI prefix (e.g., "data:image/png;base64,")
	const base64Data = base64String.replace(/^data:[a-zA-Z/]+;base64,/, '');

	// Create a Buffer from the base64 data
	const buffer = Buffer.from(base64Data, 'base64');

	if(!fileExtension) {
		fileExtension = await getFileExtensionFromBuffer(buffer);
		logger.warn("No filename extension, read file extension from buffer: " + fileExtension, {service: LogService.FILE_HANDLER});
	}

	if(!fileName) {
		fileName = randomUUID();
		logger.warn("No filename provided, generated random UUID: " + fileName, {service: LogService.FILE_HANDLER});
	}

	fileName = fileName + '.' + fileExtension;

	filePath = path.join(filePath, fileName);

	// Write the buffer to a file
	try {
		await fs.writeFile(filePath, buffer);
		logger.info("Successfully wrote file to disk: " + fileName, {service: LogService.FILE_HANDLER});
		return fileName;
	} catch (error) {
		if(error instanceof Error) {
			logger.error("Error writing file to disk: " + fileName, {service: LogService.FILE_HANDLER, errors: error.message});
		}

		return null;
	}
}

async function getFileExtensionFromBuffer(buffer: Buffer) {
	const type = await imageType(buffer);

	if(type === undefined) {
		logger.warn("Uploaded file has no extension", {service: LogService.FILE_HANDLER});
	}

	return type ? type.ext : null;
}
