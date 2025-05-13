import { getAllShortenedUrls } from '@/app/functions/get-all-shortened-urls'
import { getAllShortenedUrlsSchema } from '@/app/schemas/get-shortened-urls-schema'
import { isRight, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getAllShortenedUrlsRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/shortened-urls',
    {
      schema: {
        summary: 'Get all shortened URLs',
        tags: ['Shortened URLs'],
        querystring: getAllShortenedUrlsSchema,
        response: {
          200: z
            .object({
              total: z.number(),
              page: z.number(),
              pageSize: z.number(),
              urls: z.array(
                z.object({
                  id: z.string(),
                  originalUrl: z.string(),
                  shortenedUrl: z.string(),
                  accessesCount: z.number(),
                  createdAt: z.date(),
                })
              ),
            })
            .describe('Shortened URLs paginated list'),
        },
      },
    },
    async (request, reply) => {
      const { page, pageSize } = request.query
      const result = await getAllShortenedUrls({ page, pageSize })

      if (isRight(result)) {
        const { total, urls } = unwrapEither(result)
        return reply.status(200).send({ total, page, pageSize, urls })
      }
    }
  )
}
