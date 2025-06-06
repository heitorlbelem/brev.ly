import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeRight } from "@/shared/either";
import { desc, lt } from "drizzle-orm";
import type { z } from "zod";
import { getAllShortenedUrlsSchema } from "../schemas/get-shortened-urls-schema";

type GetAllShortenedUrlsInput = z.infer<typeof getAllShortenedUrlsSchema>;

type GetAllShortenedUrlsOutput = {
	meta: {
		nextCursor: string | null;
	};
	urls: {
		id: string;
		originalUrl: string;
		shortenedUrl: string;
		createdAt: Date;
		accessesCount: number;
	}[];
};

export async function getAllShortenedUrls(
	input: GetAllShortenedUrlsInput,
): Promise<Either<never, GetAllShortenedUrlsOutput>> {
	const { cursor, pageSize } = getAllShortenedUrlsSchema.parse(input);
	const whereClause = cursor ? lt(schema.shortenedUrls.id, cursor) : undefined;
	const results = await db.query.shortenedUrls.findMany({
		orderBy: [desc(schema.shortenedUrls.id)],
		where: whereClause,
		limit: pageSize,
	});
	const nextCursor = results.length > 0 ? results[results.length - 1].id : null;
	return makeRight({
		urls: results,
		meta: {
			nextCursor,
		},
	});
}
