import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'

import type { GetShortenedUrlInput } from '../schemas/get-shortned-url-input-schema'
import { ShortenedUrlNotFoundError } from './errors/shortened-url-not-found-error'

export async function deleteShortenedUrl({
  shortenedUrl,
}: GetShortenedUrlInput): Promise<Either<ShortenedUrlNotFoundError, null>> {
  const shortenedUrlExists = await db
    .select()
    .from(schema.shortenedUrls)
    .where(eq(schema.shortenedUrls.shortenedUrl, shortenedUrl))

  if (shortenedUrlExists.length === 0)
    return makeLeft(new ShortenedUrlNotFoundError())

  await db
    .delete(schema.shortenedUrls)
    .where(eq(schema.shortenedUrls.shortenedUrl, shortenedUrl))
  return makeRight(null)
}
