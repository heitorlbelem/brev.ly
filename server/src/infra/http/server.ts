import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { accessShortenedUrlRoute } from "./routes/access-shortened-url.route";
import { createShortenedUrlRoute } from "./routes/create-shortened-url.route";
import { deleteShortenedUrlRoute } from "./routes/delete-shortened-url.route";
import { exportAllShortenedUrlsRoute } from "./routes/export-shortened-urls.route";
import { getAllShortenedUrlsRoute } from "./routes/get-all-shortened-urls.route";
import { getShortenedUrlRoute } from "./routes/get-shortened-url.route";

const server = fastify();
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);
server.setErrorHandler((error, request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: error.validation.map((e) => e.message)[0],
		});
	}
	console.error(error);
	return reply.status(500).send({ message: "Internal server error" });
});
server.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Brev.ly API Documentation",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});
server.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});
server.register(fastifyCors, {
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE"],
});

server.register(createShortenedUrlRoute);
server.register(getAllShortenedUrlsRoute);
server.register(getShortenedUrlRoute);
server.register(deleteShortenedUrlRoute);
server.register(accessShortenedUrlRoute);
server.register(exportAllShortenedUrlsRoute);

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
	console.log("HTTP Server running!");
});
