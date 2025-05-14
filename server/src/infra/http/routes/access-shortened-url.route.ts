import { incrementShortenedUrlAccessesCount } from '@/app/functions/increment-shortened-url-accesses-count'
import { getShortenedUrlInputSchema } from '@/app/schemas/get-shortned-url-input-schema'
import { isRight, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const accessShortenedUrlRoute: FastifyPluginAsyncZod = async server => {
  server.put(
    '/shortened-urls/:shortenedUrl/access',
    {
      schema: {
        summary: 'Increment accesses count for a shortened URL',
        tags: ['Shortened URLs'],
        params: getShortenedUrlInputSchema,
        response: {
          202: z
            .object({})
            .describe('Accesses count for Shortened URL updated successfully'),
          404: z
            .object({ message: z.string() })
            .describe('Shortened URL not found'),
        },
      },
    },
    async (request, reply) => {
      const { shortenedUrl } = request.params
      const result = await incrementShortenedUrlAccessesCount({ shortenedUrl })
      if (isRight(result)) {
        return reply.status(202).send()
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'ShortenedUrlNotFoundError':
          return reply.status(404).send({ message: error.message })
      }
    }
  )
}
