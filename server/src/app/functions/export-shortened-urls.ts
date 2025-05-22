import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { type Either, makeRight } from "@/shared/either";
import { stringify } from "csv-stringify";

type ExportShortenedUrlsOutput = {
	reportUrl: string;
};

export async function exportShortenedUrls(): Promise<
	Either<never, ExportShortenedUrlsOutput>
> {
	const { sql, params } = db
		.select({
			id: schema.shortenedUrls.id,
			originalUrl: schema.shortenedUrls.originalUrl,
			shortenedUrl: schema.shortenedUrls.shortenedUrl,
			accessesCount: schema.shortenedUrls.accessesCount,
			createdAt: schema.shortenedUrls.createdAt,
		})
		.from(schema.shortenedUrls)
		.toSQL();

	const cursor = pg.unsafe(sql, params as string[]).cursor(2);
	const csv = stringify({
		delimiter: ",",
		header: true,
		columns: [
			{ key: "id", header: "ID" },
			{ key: "original_url", header: "Original URL" },
			{ key: "shortened_url", header: "Short URL" },
			{ key: "created_at", header: "Created at" },
			{ key: "accesses_count", header: "Accesses count" },
		],
	});
	const uploadToStorageStream = new PassThrough();
	const convertToCSVPipeline = pipeline(
		cursor,
		new Transform({
			objectMode: true,
			transform(chunks: unknown[], _, callback) {
				for (const chunk of chunks) {
					this.push(chunk);
				}
				callback();
			},
		}),
		csv,
		uploadToStorageStream,
	);

	const uploadToStorage = uploadFileToStorage({
		folder: "reports",
		contentType: "text/csv",
		contentStream: uploadToStorageStream,
	});

	const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

	return makeRight({ reportUrl: url });
}
