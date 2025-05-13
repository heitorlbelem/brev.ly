import { getShortenedUrl } from '@/app/functions/get-shortened-url'
import { isRight, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getShortenedUrlRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/shortened-urls/:id',
    {
      schema: {
        summary: 'Get a shortened URL',
        tags: ['Shortened URLs'],
        params: z.object({
          id: z.string().describe('Shortened URL ID'),
        }),
        response: {
          200: z
            .object({
              id: z.string(),
              originalUrl: z.string(),
              shortenedUrl: z.string(),
              createdAt: z.date(),
              accessesCount: z.number(),
            })
            .describe('Shortened URL retrieved successfully'),
          404: z
            .object({ message: z.string() })
            .describe('Shortened URL not found'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const result = await getShortenedUrl({ id })
      if (isRight(result)) {
        return reply.status(200).send(result.right)
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'ShortenedUrlNotFoundError':
          return reply.status(404).send({ message: error.message })
      }
    }
  )
}
