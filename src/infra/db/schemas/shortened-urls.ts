import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const shortenedUrls = pgTable('shortened_urls', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  originalUrl: text('original_url').notNull(),
  shortenedUrl: text('shortened_url').notNull().unique(),
  accessesCount: integer('accesses_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
