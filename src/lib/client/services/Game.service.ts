import type {  ExplorePageLoad } from '$/lib/types/domain/game';
import { GPTError } from '$/lib/types/exceptions/KnownError';
import type { JSONResponse } from '$/lib/types/http';
import type { ExplorePageSearch, LoadingError, ServicePagination } from '$/lib/types/serverTypes';
import { errorMessages } from '$/lib/validators/errorMessages';
import { PUBLIC_PAGE_URL } from '$env/static/public';
import axios from '$lib/client/axios';
import { isAxiosError } from 'axios';

export default class GameService {
	static async getPaginatedGames({ page, perPage }: ServicePagination, search: ExplorePageSearch) {
		try {
			const url = new URL(`/api/game/pagination/${page}/${perPage}`, PUBLIC_PAGE_URL);

			if (search.title && search.title !== '') {
				url.searchParams.append('search', search.title);
			}

			const response = await axios.get<JSONResponse<ExplorePageLoad>>(url.toString());
			return response.data.data;
		} catch (error) {
			if (isAxiosError<LoadingError>(error)) {
				throw new GPTError(error.response?.data.errorMessage as string);
			}
			console.log({ error });
			throw new GPTError(errorMessages.unknown);
		}
	}

	static async getCoverImage(image: string): Promise<string | null> {
		try {
			const { data: imageResponse } = await axios.get<Blob>(`/api/game/cover-image/${image}`, {
				responseType: 'blob'
			});
			return URL.createObjectURL(imageResponse);
		} catch (error) {
			return null;
		}
	}
}
