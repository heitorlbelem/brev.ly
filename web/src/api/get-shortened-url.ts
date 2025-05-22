import { api } from "../lib/axios";

export interface GetShortenedUrlParams {
	shortenedUrl: string;
}

export interface GetShortenedUrlResponse {
	id: string;
	originalUrl: string;
	shortenedUrl: string;
	accessesCount: number;
	createdAt: string;
}

export async function getShortenedUrl({ shortenedUrl }: GetShortenedUrlParams) {
	const response = await api.get<GetShortenedUrlResponse>(
		`/shortened-urls/${shortenedUrl}`,
	);

	return response.data;
}
