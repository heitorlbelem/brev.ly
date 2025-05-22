import { exportShortenedUrls } from "@/app/functions/export-shortened-urls";
import { unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const exportAllShortenedUrlsRoute: FastifyPluginAsyncZod = async (
	server,
) => {
	server.post(
		"/shortened-urls/export",
		{
			schema: {
				summary: "Export CSV file with shortened URLs",
				tags: ["Shortened URLs"],
				response: {
					200: z.object({
						reportUrl: z.string().url(),
					}),
				},
			},
		},
		async (request, reply) => {
			const result = await exportShortenedUrls();

			const { reportUrl } = unwrapEither(result);
			return reply.status(200).send({ reportUrl });
		},
	);
};
