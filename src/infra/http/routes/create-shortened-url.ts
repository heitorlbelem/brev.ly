import { createShortenedUrl } from '@/app/functions/create-shortened-url'
import { createShortenedUrlSchema } from '@/app/schemas/create-shortened-url-schema'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createShortenedUrlRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/shortened-urls',
    {
      schema: {
        summary: 'Create a shortened URL',
        tags: ['shortened-urls'],
        body: createShortenedUrlSchema,
        response: {
          201: z
            .object({ id: z.string() })
            .describe('Shortened URL created successfully'),
          400: z
            .object({ message: z.string() })
            .describe('Invalid request data'),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortenedUrl } = request.body
      const { id } = await createShortenedUrl({
        originalUrl,
        shortenedUrl,
      })
      return reply.status(201).send({ id })
    }
  )
}
