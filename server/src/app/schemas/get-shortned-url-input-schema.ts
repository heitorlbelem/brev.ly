import { z } from "zod";

export const getShortenedUrlInputSchema = z.object({
	shortenedUrl: z.string().describe("Shortened URL"),
});

export type GetShortenedUrlInput = z.infer<typeof getShortenedUrlInputSchema>;
