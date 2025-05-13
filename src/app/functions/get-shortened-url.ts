import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'

import { ShortenedUrlNotFoundError } from './errors/shortened-url-not-found-error'

type GetShortenedUrlInput = {
  id: string
}

type GetShortenedUrlOutput = {
  id: string
  originalUrl: string
  shortenedUrl: string
  createdAt: Date
  accessesCount: number
}

export async function getShortenedUrl({
  id,
}: GetShortenedUrlInput): Promise<
  Either<ShortenedUrlNotFoundError, GetShortenedUrlOutput>
> {
  const shortenedUrlExists = await db
    .select()
    .from(schema.shortenedUrls)
    .where(eq(schema.shortenedUrls.id, id))

  if (shortenedUrlExists.length === 0)
    return makeLeft(new ShortenedUrlNotFoundError())

  return makeRight(shortenedUrlExists[0])
}
