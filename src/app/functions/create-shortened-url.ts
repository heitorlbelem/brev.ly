import type { z } from 'zod'
import { createShortenedUrlSchema } from '../schemas/create-shortened-url-schema'

export type CreateShortenedUrlInput = z.input<typeof createShortenedUrlSchema>

export async function createShortenedUrl(input: CreateShortenedUrlInput) {
  const { originalUrl, shortenedUrl } = createShortenedUrlSchema.parse(input)

  const id = Math.random().toString(36).substring(2, 15)

  return { id }
}
