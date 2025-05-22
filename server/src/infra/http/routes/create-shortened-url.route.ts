import { createShortenedUrl } from "@/app/functions/create-shortened-url";
import { createShortenedUrlSchema } from "@/app/schemas/create-shortened-url-schema";
import { isRight, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createShortenedUrlRoute: FastifyPluginAsyncZod = async (
	server,
) => {
	server.post(
		"/shortened-urls",
		{
			schema: {
				summary: "Create a shortened URL",
				tags: ["Shortened URLs"],
				body: createShortenedUrlSchema,
				response: {
					201: z
						.object({ id: z.string() })
						.describe("Shortened URL created successfully"),
					400: z
						.object({ message: z.string() })
						.describe("Invalid request data"),
				},
			},
		},
		async (request, reply) => {
			const { originalUrl, shortenedUrl } = request.body;
			const result = await createShortenedUrl({
				originalUrl,
				shortenedUrl,
			});
			if (isRight(result)) {
				return reply.status(201).send(result.right);
			}
			const error = unwrapEither(result);
			switch (error.constructor.name) {
				case "ShortenedUrlAlreadyExistsError":
					return reply.status(400).send({ message: error.message });
			}
		},
	);
};
