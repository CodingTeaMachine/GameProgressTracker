import axios from '$lib/client/axios';
import { PUBLIC_PAGE_URL } from '$env/static/public';
import type { GameDropdownItem } from '$types/domain/game';
import type { JSONResponse } from '$types/http';

export default class NewGameService {
	static async getParentTitlesWithSearch(searchText: string): Promise<GameDropdownItem[]> {

		if(searchText === '') return [];

		const url = new URL('/api/parent-title', PUBLIC_PAGE_URL);
		url.searchParams.append('searchText', searchText);

		try {
			const response = await axios.get<JSONResponse<GameDropdownItem[]>>(url.toString());
			return response.data.data;
		} catch (error) {
			return [];
		}
	}
}
