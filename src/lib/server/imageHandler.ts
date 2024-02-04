import logger from '$lib/helpers/logger';
import { createDirectoryIfItDoesntExist, fileExists, getFileExtensionFromBuffer } from '$lib/server/fileHandlers';
import { LogService } from '$types/enums/LogService';
import crypto, { randomUUID } from 'crypto';
import fs from 'node:fs/promises';
import path from 'path';
import sharp from 'sharp';
//TODO: this should be stored in the database
export const imageCache: Map<string, string> = new Map();

type Dimensions = { height: number; width: number };

/**
 *  If the image has already been saved (the base64 version of the image) it's file name is returned from cache
 *  Else it is saved to disk and cache and the created file's name is returned
 */
export async function getSavedImageName(imageAsBase64: string, path: string, dimensions: Dimensions | null = null) {
	const imageHash = getImageHash(imageAsBase64);

	const cacheKey = `${path}-${imageHash}`;

	if (imageCache.has(cacheKey)) {
		logger.info('Image was in cache', { service: LogService.FILE_HANDLER, data: { imageHash } });

		if (await fileExists(path + '/' + imageCache.get(cacheKey))) {
			logger.info('Image returned from cache', { service: LogService.FILE_HANDLER, data: { imageHash } });
			return imageCache.get(cacheKey);
		} else {
			logger.warn('Image was found in cache but not on disk', {
				service: LogService.FILE_HANDLER,
				data: { imageHash, imagePath: path + '/' + imageCache.get(imageHash) }
			});
		}
	} else {
		logger.info('Image was not in cache', { service: LogService.FILE_HANDLER, data: { imageHash } });
	}

	const savedImageName = (await saveBase64StringToFile(imageAsBase64, path)) ?? undefined;

	// If there was an error saving the image, we don't want to save the image to the cache
	if (savedImageName !== undefined) {
		imageCache.set(cacheKey, savedImageName);
		logger.info('Image saved in cache', { service: LogService.FILE_HANDLER, data: { imageHash } });
	}

	logger.info('Area image returned after saving to cache', { service: LogService.FILE_HANDLER, data: { imageHash } });
	return savedImageName;
}

export async function saveBase64StringToFile(
	base64String: string,
	directoryPath: string,
	fileName: string | null = null,
	fileExtension: string | null = null,
	dimensions: Dimensions | null = null
): Promise<string | null> {
	// Remove the data URI prefix (e.g., "data:image/png;base64,")
	const base64Data = base64String.replace(/^data:[a-zA-Z/]+;base64,/, '');

	// Create a Buffer from the base64 data
	const buffer = Buffer.from(base64Data, 'base64');

	if (!fileExtension) {
		fileExtension = await getFileExtensionFromBuffer(buffer);
		logger.warn('No filename extension, read file extension from buffer: ' + fileExtension, {
			service: LogService.FILE_HANDLER
		});
	}

	if (!fileName) {
		fileName = randomUUID();
		logger.warn('No filename provided, generated random UUID: ' + fileName, { service: LogService.FILE_HANDLER });
	}

	fileName = fileName + '.' + fileExtension;
	const filePath = path.join(directoryPath, fileName);

	// Write the buffer to a file
	try {
		await createDirectoryIfItDoesntExist(directoryPath);

		const sharpSaver = sharp(buffer);

		if (dimensions !== null) {
			sharpSaver.resize(dimensions);
		}

		await sharpSaver.toFile(filePath);
		logger.info('Successfully wrote file to disk: ' + fileName, { service: LogService.FILE_HANDLER });
		return fileName;
	} catch (error) {
		if (error instanceof Error) {
			logger.error('Error writing file to disk: ' + fileName, {
				service: LogService.FILE_HANDLER,
				errors: error.message
			});
		}

		return null;
	}
}

export function getImageHash(image: string): string {
	return crypto.createHash('md5').update(image).digest('hex');
}
