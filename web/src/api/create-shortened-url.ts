import { api } from "../lib/axios";

export interface CreateShortenedUrlParams {
	originalUrl: string;
	shortenedUrl: string;
}

export interface CreateShortenedUrlResponse {
	id: string;
}

export async function createShortenedUrl({
	originalUrl,
	shortenedUrl,
}: CreateShortenedUrlParams) {
	const response = await api.post<CreateShortenedUrlResponse>(
		"/shortened-urls",
		{ originalUrl, shortenedUrl },
	);

	return response.data;
}
