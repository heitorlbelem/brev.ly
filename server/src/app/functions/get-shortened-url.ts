import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'

import type { GetShortenedUrlInput } from '../schemas/get-shortned-url-input-schema'
import { ShortenedUrlNotFoundError } from './errors/shortened-url-not-found-error'

type GetShortenedUrlOutput = {
  id: string
  originalUrl: string
  shortenedUrl: string
  createdAt: Date
  accessesCount: number
}

export async function getShortenedUrl({
  shortenedUrl,
}: GetShortenedUrlInput): Promise<
  Either<ShortenedUrlNotFoundError, GetShortenedUrlOutput>
> {
  const shortenedUrlExists = await db
    .select()
    .from(schema.shortenedUrls)
    .where(eq(schema.shortenedUrls.shortenedUrl, shortenedUrl))

  if (shortenedUrlExists.length === 0)
    return makeLeft(new ShortenedUrlNotFoundError())

  return makeRight(shortenedUrlExists[0])
}
