import {
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const shortenedUrls = pgTable(
	"shortened_urls",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => uuidv7()),
		originalUrl: text("original_url").notNull(),
		shortenedUrl: text("shortened_url").notNull(),
		accessesCount: integer("accesses_count").default(0).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [uniqueIndex("shortened_url_idx").on(table.shortenedUrl)],
);
