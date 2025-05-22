import { api } from "../lib/axios";

export interface GetShortenedUrlParams {
	shortenedUrl: string;
}

export async function accessShortenedUrl({
	shortenedUrl,
}: GetShortenedUrlParams) {
	return await api.put(`/shortened-urls/${shortenedUrl}/access`);
}
