import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'

import type { GetShortenedUrlInput } from '../schemas/get-shortned-url-input-schema'
import { ShortenedUrlNotFoundError } from './errors/shortened-url-not-found-error'

export async function incrementShortenedUrlAccessesCount({
  shortenedUrl,
}: GetShortenedUrlInput): Promise<Either<ShortenedUrlNotFoundError, null>> {
  const existentShortenedUrl = await db
    .select()
    .from(schema.shortenedUrls)
    .where(eq(schema.shortenedUrls.shortenedUrl, shortenedUrl))

  if (existentShortenedUrl.length === 0)
    return makeLeft(new ShortenedUrlNotFoundError())

  const { accessesCount } = existentShortenedUrl[0]
  await db
    .update(schema.shortenedUrls)
    .set({
      accessesCount: accessesCount + 1,
    })
    .where(eq(schema.shortenedUrls.shortenedUrl, shortenedUrl))
    .returning()
  return makeRight(null)
}
