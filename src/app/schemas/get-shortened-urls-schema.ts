import { z } from 'zod'

export const getAllShortenedUrlsSchema = z.object({
  cursor: z.string().optional(),
  pageSize: z.coerce.number().optional().default(20),
})
