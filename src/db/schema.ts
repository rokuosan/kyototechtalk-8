import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const articles = sqliteTable("articles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("userId"),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: text("createdAt").notNull().default(sql`CURRENT_TIMESTAMP`),
})
