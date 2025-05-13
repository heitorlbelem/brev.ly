import { z } from 'zod'

export const getAllShortenedUrlsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(20),
})
