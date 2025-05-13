import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/shared/either'
import { count } from 'drizzle-orm'
import type { z } from 'zod'
import { getAllShortenedUrlsSchema } from '../schemas/get-shortened-urls-schema'

type GetAllShortenedUrlsInput = z.input<typeof getAllShortenedUrlsSchema>

type GetAllShortenedUrlsOutput = {
  total: number
  urls: {
    id: string
    originalUrl: string
    shortenedUrl: string
    createdAt: Date
    accessesCount: number
  }[]
}

export async function getAllShortenedUrls(
  input: GetAllShortenedUrlsInput
): Promise<Either<unknown, GetAllShortenedUrlsOutput>> {
  const { page, pageSize } = getAllShortenedUrlsSchema.parse(input)
  const [urls, [{ total }]] = await Promise.all([
    db
      .select({
        id: schema.shortenedUrls.id,
        originalUrl: schema.shortenedUrls.originalUrl,
        shortenedUrl: schema.shortenedUrls.shortenedUrl,
        createdAt: schema.shortenedUrls.createdAt,
        accessesCount: schema.shortenedUrls.accessesCount,
      })
      .from(schema.shortenedUrls)
      .offset((page - 1) * pageSize)
      .limit(pageSize),
    db
      .select({ total: count(schema.shortenedUrls.id) })
      .from(schema.shortenedUrls),
  ])

  return makeRight({
    total,
    urls,
  })
}
