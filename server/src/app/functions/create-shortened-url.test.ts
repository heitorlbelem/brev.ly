import { randomUUID } from "node:crypto";
import { isLeft, isRight, unwrapEither } from "@/shared/either";
import { describe, expect, it } from "vitest";
import { createShortenedUrl } from "./create-shortened-url";

describe("create shortened url", () => {
	it("should be able to create a shortened url", async () => {
		const input = {
			originalUrl: "https://example.com",
			shortenedUrl: `example-${randomUUID()}`,
		};
		const sut = await createShortenedUrl(input);
		expect(isRight(sut)).toBe(true);
		const { id } = isRight(sut) ? unwrapEither(sut) : { id: undefined };
		expect(id).toBeDefined();
	});

	it("should not be able to create a shortened url with an already existing shortened url", async () => {
		const input = {
			originalUrl: "https://example.com",
			shortenedUrl: `example-${randomUUID()}`,
		};
		await createShortenedUrl(input);
		const sut = await createShortenedUrl(input);
		expect(isLeft(sut)).toBe(true);
	});

	it("should not be able to create a shortened url with an invalid original url", async () => {
		const input = {
			originalUrl: "invalid-url",
			shortenedUrl: "example",
		};
		await expect(() => createShortenedUrl(input)).rejects.toThrow();
	});

	it("should not be able to create a shortened url with an invalid format", async () => {
		const input = {
			originalUrl: "https://example.com",
			shortenedUrl: "invalid#shortened url",
		};
		await expect(() => createShortenedUrl(input)).rejects.toThrow();
	});
});
