import { z } from 'zod'

export const createShortenedUrlSchema = z.object({
  originalUrl: z.string().url(),
  shortenedUrl: z.string().url(),
})
