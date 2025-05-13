import { z } from 'zod'

export const createShortenedUrlSchema = z.object({
  originalUrl: z
    .string()
    .url()
    .refine(val => !/\s/.test(val), {
      message: 'invalid URL format',
    }),
  shortenedUrl: z
    .string()
    .url()
    .refine(val => !/\s/.test(val), {
      message: 'invalid URL format',
    }),
})
