import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import type { z } from 'zod'
import { createShortenedUrlSchema } from '../schemas/create-shortened-url-schema'

export type CreateShortenedUrlInput = z.input<typeof createShortenedUrlSchema>

export async function createShortenedUrl(input: CreateShortenedUrlInput) {
  const { originalUrl, shortenedUrl } = createShortenedUrlSchema.parse(input)

  await db.insert(schema.shortenedUrls).values({
    originalUrl,
    shortenedUrl,
  })

  return { id: '123' }
}
