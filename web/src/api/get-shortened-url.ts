import { api } from "../lib/axios";

export interface GetShortenedUrlParams {
	shortenedUrl: string;
}

export async function getShortenedUrl({ shortenedUrl }: GetShortenedUrlParams) {
	await api.get(`/shortened-urls/${shortenedUrl}`);
}
