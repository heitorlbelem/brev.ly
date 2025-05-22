import { randomUUID } from "node:crypto";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import type { InferInsertModel } from "drizzle-orm";

export const makeShortenedUrl = async (
	overrides?: Partial<InferInsertModel<typeof schema.shortenedUrls>>,
) => {
	const originalUrl = overrides?.originalUrl ?? "https://example.com";
	const shortenedUrl = overrides?.shortenedUrl ?? `example-${randomUUID()}`;
	const result = await db
		.insert(schema.shortenedUrls)
		.values({
			originalUrl,
			shortenedUrl,
			...overrides,
		})
		.returning();
	return result[0];
};
