import { pgTable, text, serial, timestamp, bigint, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { telegramUsersTable } from "./telegramUsers";

export const messagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  telegramMessageId: bigint("telegram_message_id", { mode: "number" }).notNull(),
  userId: integer("user_id").notNull().references(() => telegramUsersTable.id),
  text: text("text"),
  direction: text("direction", { enum: ["incoming", "outgoing"] }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messagesTable).omit({
  id: true,
  createdAt: true,
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messagesTable.$inferSelect;
