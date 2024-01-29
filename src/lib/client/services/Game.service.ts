import axios from '$lib/client/axios';

export default class GameService {

	static async getCoverImage(image: string): Promise<string | null> {
		const {data: imageResponse} = await axios.get<Blob>(`/api/game/cover-image/${image}`, { responseType: 'blob' });
		return URL.createObjectURL(imageResponse);
	}

}
