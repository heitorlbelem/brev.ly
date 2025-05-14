import { schema } from "@/infra/db/schemas"
import { randomUUID } from "node:crypto"
import type { InferInsertModel } from "drizzle-orm"
import { db } from "@/infra/db"

export const makeShortenedUrl = async (overrides?: Partial<InferInsertModel<typeof schema.shortenedUrls>>) => {
  const originalUrl = "https://example.com"
  const shortenedUrl = `example-${randomUUID()}`
  const result = await db.insert(schema.shortenedUrls).values({
    originalUrl,
    shortenedUrl,
    ...overrides,
  }).returning()
  return result[0]
}