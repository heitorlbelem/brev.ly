import { api } from "../lib/axios";

export interface DeleteShortenedUrlParams {
	shortenedUrl: string;
}

export async function deleteShortenedUrl({
	shortenedUrl,
}: DeleteShortenedUrlParams) {
	await api.delete(`/shortened-urls/${shortenedUrl}`);
}
