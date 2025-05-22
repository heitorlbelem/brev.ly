import { isLeft, isRight } from "@/shared/either";
import { makeShortenedUrl } from "@/test/factories/make-shortened-url";
import { describe, expect, it } from "vitest";
import { deleteShortenedUrl } from "./delete-shortened-url";

describe("delete shortened url", () => {
	it("should be able to delete a shortened url", async () => {
		const shortenedUrl1 = await makeShortenedUrl();
		const sut = await deleteShortenedUrl({
			shortenedUrl: shortenedUrl1.shortenedUrl,
		});
		expect(isRight(sut)).toBe(true);
	});

	it("should not be able to delete shortened url that does not exist", async () => {
		const shortenedUrl1 = await makeShortenedUrl();
		const sut = await deleteShortenedUrl({
			shortenedUrl: shortenedUrl1.shortenedUrl.concat("invalid"),
		});
		expect(isLeft(sut)).toBe(true);
	});
});
