export class ShortenedUrlNotFoundError extends Error {
	constructor() {
		super("Shortened URL not found.");
	}
}
