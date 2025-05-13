import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/shared/either'

type GetAllShortenedUrlsOutput = {
  id: string
  originalUrl: string
  shortenedUrl: string
  createdAt: Date
  accessesCount: number
}[]

export async function getAllShortenedUrls(): Promise<
  Either<unknown, GetAllShortenedUrlsOutput>
> {
  const shortenedUrls = await db.select().from(schema.shortenedUrls)

  return makeRight(shortenedUrls)
}
