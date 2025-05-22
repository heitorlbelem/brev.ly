import { api } from "../lib/axios";

interface GetShortenedUrlsSearchParams {
	pageSize?: number | null;
	cursor?: string | null;
}

export interface GetShortenedUrlsResponse {
	urls: {
		id: string;
		originalUrl: string;
		shortenedUrl: string;
		accessesCount: number;
		createdAt: string;
	}[];
	meta: {
		nextCursor: string | null;
	};
}

export async function getUrls({
	pageSize,
	cursor,
}: GetShortenedUrlsSearchParams) {
	const response = await api.get<GetShortenedUrlsResponse>("/shortened-urls", {
		params: {
			pageSize,
			cursor,
		},
	});
	return response.data;
}
