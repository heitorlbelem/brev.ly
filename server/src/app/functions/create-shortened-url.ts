import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'
import type { z } from 'zod'
import { createShortenedUrlSchema } from '../schemas/create-shortened-url-schema'
import { ShortenedUrlAlreadyExistsError } from './errors/shortened-url-already-exists-error'

export type CreateShortenedUrlInput = z.input<typeof createShortenedUrlSchema>

export async function createShortenedUrl(
  input: CreateShortenedUrlInput
): Promise<Either<ShortenedUrlAlreadyExistsError, { id: string }>> {
  const { originalUrl, shortenedUrl } = createShortenedUrlSchema.parse(input)

  const shortenedUrlExists = await db
    .select()
    .from(schema.shortenedUrls)
    .where(eq(schema.shortenedUrls.shortenedUrl, shortenedUrl))

  if (shortenedUrlExists.length > 0)
    return makeLeft(new ShortenedUrlAlreadyExistsError())

  const newShortenedUrl = await db
    .insert(schema.shortenedUrls)
    .values({
      originalUrl,
      shortenedUrl,
    })
    .returning({ id: schema.shortenedUrls.id })
  return makeRight({ id: newShortenedUrl[0].id })
}
