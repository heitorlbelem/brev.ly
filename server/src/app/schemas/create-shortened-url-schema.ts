import { z } from "zod";

export const createShortenedUrlSchema = z.object({
	originalUrl: z.string().url(),
	shortenedUrl: z
		.string()
		.regex(/^[a-z0-9-]+$/, {
			message: "Invalid shortened URL format",
		})
		.refine((val) => !/\s/.test(val), {
			message: "Invalid shortened URL format",
		}),
});
