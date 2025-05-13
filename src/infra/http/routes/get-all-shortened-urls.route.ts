import { getAllShortenedUrls } from '@/app/functions/get-all-shortened-urls'
import { isRight } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getAllShortenedUrlsRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/shortened-urls',
    {
      schema: {
        summary: 'Get all shortened URLs',
        tags: ['Shortened URLs'],
        response: {
          200: z
            .object({
              urls: z.array(
                z.object({
                  id: z.string(),
                  originalUrl: z.string(),
                  shortenedUrl: z.string(),
                  createdAt: z.date(),
                  accessesCount: z.number(),
                })
              ),
            })
            .describe('Shortened URLs retrieved successfully'),
        },
      },
    },
    async (_, reply) => {
      const result = await getAllShortenedUrls()
      if (isRight(result)) {
        return reply.status(200).send({ urls: result.right })
      }
    }
  )
}
