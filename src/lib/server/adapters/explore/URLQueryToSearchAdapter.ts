import type { ExplorePageSearch } from '$/lib/types/serverTypes';

export default class URLQueryToSearchAdapter {
    static getSearch(url: URL): ExplorePageSearch {
        return {
            title: url.searchParams.get('search') ?? undefined
        };
    }
}