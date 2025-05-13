import { deleteShortenedUrl } from '@/app/functions/delete-shortened-url'
import { isRight, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteShortenedUrlRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/shortened-urls/:shortenedUrl',
    {
      schema: {
        summary: 'Delete a shortened URL',
        tags: ['Shortened URLs'],
        params: z.object({
          shortenedUrl: z.string().describe('Shortened URL'),
        }),
        response: {
          204: z.object({}).describe('Shortened URL deleted successfully'),
          404: z
            .object({ message: z.string() })
            .describe('Shortened URL not found'),
        },
      },
    },
    async (request, reply) => {
      const { shortenedUrl } = request.params
      const result = await deleteShortenedUrl({ shortenedUrl })
      if (isRight(result)) {
        return reply.status(204).send()
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'ShortenedUrlNotFoundError':
          return reply.status(404).send({ message: error.message })
      }
    }
  )
}
