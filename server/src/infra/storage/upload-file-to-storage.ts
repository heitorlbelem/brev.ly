import { randomUUID } from "node:crypto";
import { Readable } from "node:stream";
import { env } from "@/env";
import { Upload } from "@aws-sdk/lib-storage";
import { z } from "zod";
import { r2 } from "./client";

const uploadFileToStorageInputSchema = z.object({
	folder: z.enum(["reports"]),
	contentType: z.string(),
	contentStream: z.instanceof(Readable),
});

type UploadFileToStorageInput = z.input<typeof uploadFileToStorageInputSchema>;

export async function uploadFileToStorage(input: UploadFileToStorageInput) {
	const { folder, contentType, contentStream } =
		uploadFileToStorageInputSchema.parse(input);

	const uniqueFileName = `${folder}/${randomUUID()}-report.csv`;
	const upload = new Upload({
		client: r2,
		params: {
			Key: uniqueFileName,
			Bucket: env.CLOUDFLARE_BUCKET,
			Body: contentStream,
			ContentType: contentType,
		},
	});
	await upload.done();
	return {
		key: uniqueFileName,
		url: new URL(uniqueFileName, env.CLOUDFLARE_PUBLIC_URL).toString(),
	};
}
