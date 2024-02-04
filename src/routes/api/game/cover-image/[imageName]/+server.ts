import { GAME_COVER_IMAGE_FOLDER_NAME } from '$lib/data/constants';
import logger from '$lib/helpers/logger';
import { LogService } from '$types/enums/LogService';
import { fail, type RequestEvent } from '@sveltejs/kit';
import { HttpStatusCode } from 'axios';
import { join, normalize } from 'path';
import { existsSync, readFileSync, accessSync } from 'fs';

export async function GET({params}: RequestEvent)  {

	const service = LogService.API_GAME_COVER_IMAGE_IMAGE_NAME_GET;

	const imageName  = params.imageName as string;

	if(imageName === "null") {
		logger.error("Get image request with null", {service});
		return fail(HttpStatusCode.NotFound);
	}

	logger.debug("Get image request with name: " + imageName, {service});

	const sanitizedImageName = normalize(imageName).replace(/^(\.\.[/\\])+/, '');
	const imagePath = join('src', 'lib' , 'data', 'upload', GAME_COVER_IMAGE_FOLDER_NAME ,  sanitizedImageName);

	logger.debug("Getting image from: " + imagePath, {service});

	if(existsSync(imagePath)) {
		logger.debug("File exists:" + sanitizedImageName, {service});

		try {
			accessSync(imagePath);
		} catch (error){
			logger.error("File was not accessible: " + sanitizedImageName, {service});
			return fail(HttpStatusCode.InternalServerError);
		}

		return new Response(readFileSync(imagePath), { headers: { 'Content-Type': 'image/jpeg' } });
	} else {
		logger.error("File didn't exist:" + sanitizedImageName, {service});
		return fail(HttpStatusCode.NotFound);
	}
}
