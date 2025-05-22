import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { isLeft, isRight } from "@/shared/either";
import { makeShortenedUrl } from "@/test/factories/make-shortened-url";
import { eq } from "drizzle-orm";
import { describe, expect, it } from "vitest";
import { incrementShortenedUrlAccessesCount } from "./increment-shortened-url-accesses-count";

describe("increment shortened url accesses count", () => {
	it("should be able to increment a shortened url accesses count", async () => {
		const shortenedUrl1 = await makeShortenedUrl();
		const sut = await incrementShortenedUrlAccessesCount({
			shortenedUrl: shortenedUrl1.shortenedUrl,
		});
		expect(isRight(sut)).toBe(true);

		const result = await db
			.select({ accessesCount: schema.shortenedUrls.accessesCount })
			.from(schema.shortenedUrls)
			.where(eq(schema.shortenedUrls.shortenedUrl, shortenedUrl1.shortenedUrl));
		expect(result[0]?.accessesCount).toBe(1);
	});

	it("should not be able to increment accesses count for a shortened url that does not exist", async () => {
		const shortenedUrl1 = await makeShortenedUrl();
		const sut = await incrementShortenedUrlAccessesCount({
			shortenedUrl: shortenedUrl1.shortenedUrl.concat("invalid"),
		});
		expect(isLeft(sut)).toBe(true);
	});
});
